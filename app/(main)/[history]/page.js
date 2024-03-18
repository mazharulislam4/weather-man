"use client";
import BodyContent from "@/components/body/bodyContent";
import { getDataByHandler, getHandler } from "@/firebase/db";
import { activeUserState } from "@/lib/ui";
import ProtectedRoute from "@/protectedRoute";
import { useHookstate } from "@hookstate/core";
import { useParams, useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

function History() {
  const params = useParams();
  const activeUser = useHookstate(activeUserState).get({ noproxy: true })?.tokens;
  const [constructData, setConstructData] = useState([]);
  const router = useRouter(); 


  useLayoutEffect(() => {
    if (params?.history) {
      (async () => {
        try {
          const res = await getHandler(activeUser?.uid, params.history);

          const isValidParam = res?.find(
            (value) => value.handler === params.history
          );

          if (!isValidParam) {
           router.push("/")
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [params.history]);


  useLayoutEffect(() => {
    (async () => {
      try {
        const data = await getDataByHandler(params.history, activeUser?.uid);
        let construct = [];

        if (Object.keys(data).length > 0) {
          construct = data.list.map((item) => ({
            message: item.message,
            seconds: item.timestamp.seconds,
            nanoseconds: item.timestamp.nanoseconds,
          }));
        }
        setConstructData(construct);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [params.history]);





  return (
    <ProtectedRoute>
      <div
        role="presentation"
        className="h-full relative w-full flex flex-col overflow-hidden "
      >
        <BodyContent data={constructData} handler={params.history} />
      </div>
    </ProtectedRoute>
  );
}

export default History;
