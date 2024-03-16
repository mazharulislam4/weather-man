"use client";

import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";
import useAuth from "./hook/useAuth";

function WithAuthHOC(Copmonent) {
  return function AuthenticComponent(props) {
    const isAuth = useAuth();

    useLayoutEffect(() => {
      if (!isAuth) {
        return redirect("/login");
      }
      return () => {};
    }, [isAuth]);

    return <Copmonent {...props} />;
  };
}

export default WithAuthHOC;
