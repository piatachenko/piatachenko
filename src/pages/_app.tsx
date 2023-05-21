import { type AppType } from "next/app";
import { useRouter } from "next/router";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <>
      <iframe
        src="/iframe"
        className={
          router.pathname === "/" ? "absolute h-full w-full" : "hidden"
        }
      />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
