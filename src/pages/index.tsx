import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import MainLayout from "~/layouts/MainLayout";
import { imageArray } from "./iframe";
import { ScrollPositionContext } from "./_app";

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const context = useContext(ScrollPositionContext);

  if (!context) {
    throw new Error(
      "ChildComponent must be used within a ScrollPositionProvider"
    );
  }

  const { scrollPosition } = context;

  useEffect(() => {
    function updateWindowWidth() {
      setWindowWidth(window.innerWidth);
    }
    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  useEffect(() => {
    const scrollWidth =
      document.querySelector("iframe")?.contentWindow?.document.documentElement
        .scrollWidth;
    if (scrollWidth) {
      const imageWidth = (scrollWidth - windowWidth) / (imageArray.length - 1);
      const newCurrentItem = Math.floor(scrollPosition / imageWidth + 1.5);
      setCurrentItem(newCurrentItem);
    }
  }, [scrollPosition, windowWidth]);

  return (
    <>
      <Head>
        <title>IP: Work</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout page={"Work"}>
        <div
          className="fixed right-1/2 z-10 flex translate-x-1/2 translate-y-1/2 items-center justify-center gap-1 mix-blend-difference"
          style={{
            bottom: "max(calc((100vh - var(--h)) / 4), 2rem)",
          }}
        >
          <div className="h-[1.5em] overflow-hidden">
            {imageArray.map((_, index) => (
              <div
                key={index}
                className="transition-all duration-[.8s] ease-out"
                style={{
                  transform: `translateY(-${(currentItem - 1) * 100}%)`,
                }}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div>-</div>
          <div>{imageArray.length}</div>
        </div>
        <div className="fixed bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 mix-blend-difference before:absolute before:bottom-1/2 before:right-1/2 before:block before:h-[.11rem] before:w-7 before:translate-x-1/2 before:translate-y-1/2 before:rotate-90 before:bg-zinc-100 before:content-[''] after:absolute after:bottom-1/2 after:right-1/2 after:block after:h-[.11rem] after:w-7 after:translate-x-1/2 after:translate-y-1/2 after:bg-zinc-100 after:content-['']" />
      </MainLayout>
    </>
  );
}
