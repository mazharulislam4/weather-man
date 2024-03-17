import {
  activeCountryState,
  activeUserLocation,
  activeUserState,
  getCurrentUserLocation,
} from "@/lib/ui";
import { useHookstate } from "@hookstate/core";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import commonData from "../common.json";


export const authCheckContext = React.createContext({});

export const getAuthCheck = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useContext(authCheckContext);
};

export const AuthCheckProvider = ({ children }) => {
  const [authData, setAuthData] = useState({});
  const activeUserLocationRef = useHookstate(activeUserLocation);
  const activeUserStateRef = useHookstate(activeUserState);
  const activeCountryStateRef = useHookstate(activeCountryState);

  useEffect(() => {
    const loggedIn = Cookies.get(commonData.auth_cookie_name);

    if (loggedIn) {
      const data = JSON.parse(loggedIn);
      let USER = sessionStorage.getItem("__usr__");
      USER ? (USER = JSON.parse(USER)) : {};
      setAuthData({ user: USER, tokens: data });
      activeUserStateRef.set({ user: USER, tokens: data });
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const currentLocationRes = await getCurrentUserLocation();
        activeCountryStateRef.set(currentLocationRes?.country);
        activeUserLocationRef.set({
          location: { ...currentLocationRes },
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <authCheckContext.Provider value={{ authData, setAuthData }}>
      {children}
    </authCheckContext.Provider>
  );
};
