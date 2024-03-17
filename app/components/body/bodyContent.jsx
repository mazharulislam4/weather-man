"use client";
import { addData, firestoreState } from "@/firebase/db";
import { getWeather } from "@/lib/getWeather";
import {
  activeCountryState,
  activeUserState,
  getWeatherResponseHTML,
} from "@/lib/ui";
import { getZipCodeFromPrompt, validateZipCode } from "@/utils/utils";
import { useHookstate } from "@hookstate/core";
import escapeHTML from "escape-html";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../navbar/navbar";
import UserInput from "../userInput/userInput";
import CurrentWeather from "./CurrentWeather";
import MessageBox from "./messageBox";

function BodyContent({ data, handler }) {
  const [userInput, setUserInput] = useState("");
  const messageBoxRef = useRef(null);
  const parentRef = useRef(null);
  const [messageData, setMessageData] = useState(data || []);
  const activeCountry = useHookstate(activeCountryState).get({ noproxy: true });
  const [isLoading, setIsLoading] = useState(false);
  const firestoreStateRef = useHookstate(firestoreState);
  let docRef = firestoreStateRef.get({ noproxy: true })?.firestore;
  const activeUser = useHookstate(activeUserState).get({ noproxy: true });
  const urlPath = usePathname();


  
  if (Object.keys(docRef).length === 0 && handler) {
    docRef.handler = handler;
  }


  useEffect(() => {
    if (data) {
      setMessageData(data);
    }
  }, [data]);

  const inputChangeHandler = (e) => {
    setUserInput(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const userInputs = { content: userInput, role: "user" };

    let systemRes = {
      content:
        "It seems your message hasn't any valid zip code. check the country that you have selected.",
      role: "system",
      isRendering: false,
      isError: false,
    };

    setMessageData([...messageData, { message: [userInputs] }]);
    // zip code from regex
    const getZipCodePattern = getZipCodeFromPrompt(userInput);

    // clear input field
    setIsLoading(true);
    setUserInput("");

    if (getZipCodePattern) {
      systemRes.isRendering = true;
      systemRes.isError = false;
      systemRes.content = "";

      setMessageData([
        ...messageData,
        { message: [userInputs] },
        { message: [systemRes] },
      ]);

      const valid = getZipCodePattern.slice(0, 6).map((value) => {
        try {
          const code = value.replace("w:", "").replace("W:", "").trim();
          const isValid = validateZipCode(activeCountry, code);
          return { code: code, isValid: isValid, country: activeCountry };
        } catch (err) {
          return { error: true, err: err };
        }
      });

      // if single input but invalid zip code
      if (valid?.length === 1 && !valid[0]?.isValid) {
        systemRes.isRendering = true;
        systemRes.content =
          "It seems your message hasn't any valid zip code. check the country that you have selected or write correct zip code.";

        setMessageData([
          ...messageData,
          { message: [userInputs] },
          { message: [systemRes] },
        ]);

        setIsLoading(false);
        systemRes.isRendering = false;
        await addDataOnFireStore([userInputs, systemRes]);
        return;
      }

      const validCodesObj = valid.filter((value) => value.isValid);
      const inValidCodesObj = valid.filter((value) => !value.isValid);

      let debounce = false;
      // batching  zip codes objects for multiple request
      const batchRequest = async (zip, countryCode) => {
        if (debounce) {
          await delay(600);
        }
        try {
          const res = await getWeather({ zip: zip, countryCode: countryCode });
          debounce = true;
          return res;
        } catch (err) {
          debounce = false;
          return err;
        }
      };

      // Function to simulate delay
      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      // calling  weather api

      (async () => {
        try {
          let responses = [];

          for (const value of validCodesObj) {
            const res = await batchRequest(value.code, value.country);
            responses = [...responses, { ...res, zip: value.code }];
          }

          const contentHTML = escapeHTML(
            getWeatherResponseHTML({
              data: responses,
              errorData: inValidCodesObj,
            })
          );

          systemRes.content = contentHTML;
          systemRes.isRendering = false;
          setMessageData([
            ...messageData,
            { message: [userInputs] },
            { message: [systemRes] },
          ]);
          await addDataOnFireStore([userInputs, systemRes]);
        } catch (err) {
          systemRes.content = "";
          systemRes.isRendering = false;
          systemRes.isError = false;
          setMessageData([
            ...messageData,
            { message: [userInputs] },
            { message: [systemRes] },
          ]);
        } finally {
          setIsLoading(false);
        }
      })();
    } else {
      setMessageData([
        ...messageData,
        { message: [userInputs] },
        { message: [systemRes] },
      ]);
      setIsLoading(false);
      await addDataOnFireStore([userInputs, systemRes]);
      return;
    }
  };

  // add data on fire store
  const addDataOnFireStore = async (data = []) => {
    try {
      if (!docRef?.handler) {
        return toast.error("There is an error occurred  !");
      }

      if (Object.keys(activeUser).length === 0 && !activeUser?.user?.uid) {
        return toast.error("There is an error occurred ! reload the page");
      }

      return await addData(docRef, data, activeUser?.user);
    } catch (err) {
      console.log(err);
    }
  };

  // automatic scroll on top to bottom on message box

  useEffect(() => {
    if (typeof window !== undefined) {
      if (parentRef?.current) {
        parentRef.current.scrollTop = parentRef.current.scrollHeight;
      }
    }
  }, [parentRef, messageData]);

  return (
    <>
      <div
        className="flex-1 w-full flex-shrink-0 relative overflow-auto"
        ref={parentRef}
      >
        <div className="w-full sticky top-0 shadow-sm  z-50 bg-background ">
          <div className="container py-2">
            <Navbar />
          </div>
        </div>

        <div className="max-w-[50rem] h-auto relative mx-auto z-0 pt-3  pb-10 flex flex-col gap-65">
          {messageData.length > 0 ? (
            messageData.map((value) =>
              value?.message?.map((data, index) => (
                <MessageBox
                  ref={messageBoxRef}
                  key={index}
                  data={data}
                  isLoading={data?.isRendering}
                  isError={data?.isError}
                />
              ))
            )
          ) : urlPath === "/" ? (
            <div className="w-full mt-[15%] ">
              <CurrentWeather />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="flex-shrink-0 w-full">
        <div className="pb-12 px-3 max-w-[50rem] mx-auto">
          <UserInput
            changeHandler={inputChangeHandler}
            value={userInput}
            submitHandler={submitHandler}
            disable={!userInput || isLoading}
          />
        </div>
      </div>
    </>
  );
}

export default BodyContent;
