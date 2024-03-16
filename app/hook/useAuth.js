"use client";
import { activeUserState } from "@/lib/ui";
import { useHookstate } from "@hookstate/core";

function useAuth() {
  const activeUser = useHookstate(activeUserState).get({
    noproxy: true,
  })?.tokens;

  if (activeUser?.accessToken) {
    return true;
  }

  return false;
}

export default useAuth;
