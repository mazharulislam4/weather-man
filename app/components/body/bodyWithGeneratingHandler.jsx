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


  return <BodyContent />;
}
