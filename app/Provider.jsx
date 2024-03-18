"use client";
import { NextUIProvider } from "@nextui-org/react";
import useAuthChecking from "./hook/useAuthChecking";

function Provider({ children }) {
  const authcheck = useAuthChecking();
  return <NextUIProvider>{children}</NextUIProvider>;
}

export default Provider;
