"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import useAuth from "./hook/useAuth";

export default function ProtectedRoute({ children }) {
  const isAuth = useAuth();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!isAuth) {
      return router.replace("/login", undefined, { shallow: true });
    }
    return () => {};
  }, []);

  return children;
}
