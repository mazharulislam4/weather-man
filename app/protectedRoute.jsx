"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "./hook/useAuth";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const isAuth = useAuth();
  useEffect(() => {
    if (!isAuth) {
      return router.replace("/login", { shallow: true });
    }
    return () => {};
  }, [isAuth]);

  return children;
}
