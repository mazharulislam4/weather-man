"use client";

import {
  activeCountryState,
  activeUserLocation,
  activeUserState,
  getCurrentUserLocation,
} from "@/lib/ui";
import { useHookstate } from "@hookstate/core";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import commonData from "../../common.json";

function useAuthChecking() {
  const [isLoading, setIsLoading] = useState(true);
  const activeUserStateRef = useHookstate(activeUserState);
  const activeCountryStateRef = useHookstate(activeCountryState);

  useEffect(() => {
    const loggedIn = Cookies.get(commonData.auth_cookie_name);

    if (loggedIn) {
      const data = JSON.parse(loggedIn);
      let user = sessionStorage.getItem("__usr__");
      user ? (user = JSON.parse(user)) : {};
      activeUserStateRef.set({ user: user, tokens: data });

      (async () => {
        try {
          const currentLocationRes = await getCurrentUserLocation();
          activeCountryStateRef.set(currentLocationRes?.country);
          activeUserLocation.set({ location: { ...currentLocationRes } });
        } catch (err) {
          setIsLoading(false);
        }
      })();
    }

    setIsLoading(false);

    return () => {};
  }, []);

  return isLoading;
}

export default useAuthChecking;
