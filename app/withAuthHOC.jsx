import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import useAuth from "./hook/useAuth";

function WithAuthHOC(Component) {
  return function AuthenticComponent(props) {
    const isAuth = useAuth();
    const router = useRouter();
    useLayoutEffect(() => {
      if (!isAuth) {
        return router.replace("/login");
      }
      return () => {};
    }, [ ]);

    return <Component {...props} /> ;
  };
}

export default WithAuthHOC;
