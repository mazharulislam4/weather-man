"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import useAuth from "./hook/useAuth";

function PublicRoute({ children }) {
  const isAuth = useAuth();
  const router = useRouter();
  useLayoutEffect(() => {
    if (isAuth) {
      return router.replace("/" , {shallow: true});
    }
    return () => {};
  }, [isAuth]);

  return children 
}

export default PublicRoute;
