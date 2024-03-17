import { useHookstate } from "@hookstate/core";
import Cookies from "js-cookie";
import { useEffect } from "react";
import commonData from "./common.json";
import {
    activeCountryState,
    activeUserLocation,
    activeUserState,
    getCurrentUserLocation,
} from "./lib/ui";

function withApp(Component) {
  return function APP(props) {
    const activeUserLocationRef = useHookstate(activeUserLocation);
    const activeUserStateRef = useHookstate(activeUserState);
    const activeCountryStateRef = useHookstate(activeCountryState);

    useEffect(() => {
      const fetchUserData = async () => {
        const loggedIn = Cookies.get(commonData.auth_cookie_name);
        if (loggedIn) {
          const data = JSON.parse(loggedIn);
          let user = sessionStorage.getItem("__usr__");
          user ? (user = JSON.parse(user)) : {};
          activeUserStateRef.set({ user: user, tokens: data });

          try {
            const currentLocationRes = await getCurrentUserLocation();
            activeCountryStateRef.set(currentLocationRes?.country);
            activeUserLocationRef.set({
              location: { ...currentLocationRes },
            });
            setIsLoading(false);
          } catch (err) {
            console.log(err);
          }
        } else {
        }
      };

      fetchUserData();
    }, []);

    return <Component {...props} />;
  };
}

export default withApp;
