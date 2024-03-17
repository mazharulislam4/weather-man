"use client";
import { useHookstate } from "@hookstate/core";
import { v1 as uuidv1 } from "uuid";

import { createHandlerDocRef, firestoreState } from "@/firebase/db";
import {
  activeUserState,
  currentHandlerState,
  sidebarListState,
} from "@/lib/ui";
import { useEffect } from "react";
import BodyContent from "./bodyContent";

export default function BodyWithGeneratingHandler() {
  const firestoreStateRef = useHookstate(firestoreState);
  const sidebarListStateRef = useHookstate(sidebarListState);
  const activeUser = useHookstate(activeUserState).get();
  const docRef = firestoreStateRef.get({ noproxy: true })?.firestore;

  console.log(docRef);

  const currentHandler = useHookstate(currentHandlerState).get({
    noproxy: true,
  })?.handler;

  if (!docRef?.docRef) {
    const v1options = {
      msecs: new Date().getTime(),
    };
    const uuid = uuidv1(v1options);
    createHandlerDocRef(uuid);
  }


  useEffect(() => {
    if (currentHandler) {
      const sidebarList = sidebarListStateRef.get({ noproxy: true })?.list;
      let isExist = sidebarList?.find(
        (value) => value.handler === currentHandler
      );

      if (!isExist) {
        sidebarListStateRef.set((prev) => ({
          list: [...prev.list, currentHandler],
        }));
      } else {
        sidebarListStateRef.set((prev) => {
          prev.list.push(currentHandler);
        });
      }
      const newUrl = `/${currentHandler.handler}`; // Construct the new URL path
      window.history.pushState({ path: newUrl }, "", newUrl); // Update URL path
    }
  }, [currentHandler]);

  return <BodyContent />;
}
