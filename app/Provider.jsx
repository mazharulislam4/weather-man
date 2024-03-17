"use client";
import { NextUIProvider } from "@nextui-org/react";
import { AuthCheckProvider } from "./context/authContext";

function Provider({ children }) {
  return (
    <NextUIProvider>
      <AuthCheckProvider>{children}</AuthCheckProvider>
    </NextUIProvider>
  );
}

export default Provider;
