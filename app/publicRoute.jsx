"use client";

import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";
import useAuth from "./hook/useAuth";

function PublicRoute({ children }) {
  const isAuth = useAuth();

  useLayoutEffect(() => {
    if (isAuth) {
       redirect("/h");
    }
    return () => {};
  }, [isAuth]);

  return children;
}

export default PublicRoute;
