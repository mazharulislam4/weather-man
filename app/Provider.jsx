"use client";
import { NextUIProvider } from "@nextui-org/react";
import InitialLoader from "./components/loader/initialLoader";
import useAuthChecking from "./hook/useAuthChecking";

function Provider({ children }) {
  const authChecking = useAuthChecking();

  if (!authChecking) {
    return <InitialLoader />;
  }

  return <NextUIProvider>{children}</NextUIProvider>;
}

export default Provider;
