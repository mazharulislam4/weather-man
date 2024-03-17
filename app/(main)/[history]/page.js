"use client";
import BodyContent from "@/components/body/bodyContent";
import { getDataByHandler, getHandler } from "@/firebase/db";
import { activeUserState } from "@/lib/ui";
import WithAuthHOC from "@/withAuthHOC";
import { useHookstate } from "@hookstate/core";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function History() {
  const params = useParams();
  const activeUser = useHookstate(activeUserState).get({ noproxy: true })?.user;
  const [constructData, setConstructData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (params?.history) {
      (async () => {
        try {
          const res = await getHandler(activeUser?.uid, params.history);
          const isValidParam = res?.find(
            (value) => value.handler === params.history
          );

          if (!isValidParam) {
            router.push("/");
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [params.history]);

  useEffect(() => {
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
    <div
      role="presentation"
      className="h-full relative w-full flex flex-col overflow-hidden "
    >
      <BodyContent data={constructData} handler={params.history} />
    </div>
  );
}

export default WithAuthHOC(History);
