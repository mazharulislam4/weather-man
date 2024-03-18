"use client";

import InitialLoader from "./components/loader/initialLoader";
import useAuthChecking from "./hook/useAuthChecking";

function LoaderWrapper({ children , loading }) {
  const isLoading = useAuthChecking();

  if (isLoading) {
    return <InitialLoader />;
  }

  return children;
}

export default LoaderWrapper;
