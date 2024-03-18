"use client";
import ProtectedRoute from "@/protectedRoute";
import { useHookstate } from "@hookstate/core";
import { v1 as uuidv1 } from "uuid";

import BodyContent from "@/components/body/bodyContent";
import { createHandlerDocRef, firestoreState } from "@/firebase/db";
import {
  activeUserState,
  currentHandlerState,
  sidebarListState,
} from "@/lib/ui";
import { useEffect, useState } from "react";


function HomePage() {
  const firestoreStateRef = useHookstate(firestoreState);
  const sidebarListStateRef = useHookstate(sidebarListState);
  const activeUser = useHookstate(activeUserState).get({noproxy: true});
  const docRef = firestoreStateRef.get({ noproxy: true })?.firestore;
  const currentHandler = useHookstate(currentHandlerState).get({
    noproxy: true,
  })?.handler;



const [keyChange , setKeychange] = useState(0); 



useEffect(()=>{

 
  setKeychange((prev)=> prev +=1)

}, [])



  useEffect(() => {
    if (!docRef?.docRef) {
      const v1options = {
        msecs: new Date().getTime(),
      };
      const uuid = uuidv1(v1options);
      createHandlerDocRef(uuid);
    }
  }, [docRef]);





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

  return (
    <ProtectedRoute  key={keyChange}>
      <div
        role="presentation"
        className="h-full relative w-full flex flex-col overflow-hidden "
      
      >
        <BodyContent />
      </div>
    </ProtectedRoute>
  );
}

export default HomePage;
