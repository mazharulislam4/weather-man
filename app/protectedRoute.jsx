"use client";

import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";
import useAuth from "./hook/useAuth";

export default function ProtectedRoute({children}) {
  const isAuth = useAuth();

  useLayoutEffect(() => {
    if (!isAuth) {
      return redirect("/login");
    }
    return () => {};
  }, [isAuth]);

  return children;
}
