import { type AppProps } from "next/app";
import { type Router } from "next/router";
import {
  createContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import "~/styles/globals.css";

interface ScrollPositionContextData {
  scrollPosition: number;
  setScrollPosition: Dispatch<SetStateAction<number>>;
}

export const ScrollPositionContext = createContext<
  ScrollPositionContextData | undefined
>(undefined);

export default function MyApp({
  Component,
  pageProps,
  router,
}: AppProps & { router: Router }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const value = { scrollPosition, setScrollPosition };

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current?.contentWindow;

    if (iframe) {
      const handleScroll = () => {
        setScrollPosition(iframe.document.documentElement.scrollLeft);
      };

      iframe.addEventListener("scroll", handleScroll);

      return () => {
        iframe.removeEventListener("scroll", handleScroll);
      };
    }
  }, [iframeRef]);

  useEffect(() => {
    setScrollPosition(0);
  }, [router.pathname]);

  return (
    <>
      <ScrollPositionContext.Provider value={value}>
        <iframe
          ref={iframeRef}
          src="/iframe"
          title="Carousel"
          className={
            router.pathname === "/" ? "absolute h-full w-full" : "hidden"
          }
        />
        <Component {...pageProps} />
      </ScrollPositionContext.Provider>
    </>
  );
}
