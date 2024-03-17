"use client";
import { getAuthCheck } from "@/context/authContext";
import { activeUserState } from "@/lib/ui";
import { useHookstate } from "@hookstate/core";

function useAuth() {

  const { authData } = getAuthCheck();

  if (Object.keys(authData).length > 0 && authData?.tokens?.accessToken) {
    return true;
  }

  return false;
}

export default useAuth;
