import { motion } from "framer-motion";
import { useEffect, useState, type CSSProperties } from "react";
import { ScrollerMotion } from "scroller-motion";

export const imageArray = [
  "/assets/instrument.webp",
  "/assets/lobe-ai.webp",
  "/assets/oh-studio.webp",
  "/assets/backstage-talks.webp",
  "/assets/ableton.webp",
];

export default function Iframe() {
  // const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  // useEffect(() => {
  //   function onScroll() {
  //     const scrollWidth = document.documentElement.scrollWidth;
  //     const scrollLeft = document.documentElement.scrollLeft;
  //     const left =
  //       (-(scrollWidth / scale - windowWidth) *
  //         (scrollWidth - windowWidth - scrollLeft)) /
  //       (scrollWidth - windowWidth);
  //     const right =
  //       ((scrollWidth / scale - windowWidth) * scrollLeft) /
  //       (scrollWidth - windowWidth);
  //     setDragConstraints({ left, right });
  //   }
  //   document.documentElement.addEventListener("mouseover", onScroll);
  //   return () =>
  //     document.documentElement.removeEventListener("mouseover", onScroll);
  // }, [windowWidth]);

  const [currentItem, setCurrentItem] = useState(1);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

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
    function onScroll() {
      setScrollLeft(document.documentElement.scrollLeft);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const imageWidth =
      (document.documentElement.scrollWidth - windowWidth) /
      (imageArray.length - 1);
    const newCurrentItem = Math.floor(scrollLeft / imageWidth + 1.5);
    setCurrentItem(newCurrentItem);
  }, [scrollLeft]);

  useEffect(() => {
    function onWheel(e: WheelEvent) {
      if (!e.deltaY) {
        return;
      }
      document.documentElement.scrollLeft += e.deltaY + e.deltaX;
    }
    window.addEventListener("wheel", onWheel);
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <>
      <main className="iframe">
        <div
          className="fixed bottom-[--bottom] right-1/2 z-10 flex translate-x-1/2 translate-y-1/2 items-center justify-center gap-1 mix-blend-difference"
          style={
            {
              "--bottom": "max(calc((100vh - var(--h)) / 4), 2rem)",
            } as CSSProperties
          }
        >
          <div className="h-[1.5em] overflow-hidden">
            {imageArray.map((_, index) => (
              <div
                key={index}
                className="translate-y-[--translate-y] transition-all duration-[.8s] ease-out"
                style={
                  {
                    "--translate-y": `-${(currentItem - 1) * 100}%`,
                  } as CSSProperties
                }
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div>-</div>
          <div>{imageArray.length}</div>
        </div>
        <ScrollerMotion scale={1.25}>
          <motion.ul
            className="flex min-h-screen items-center pl-[--px]"
            style={
              {
                "--px": "calc(50vw - var(--w) / 2)",
              } as CSSProperties
            }
          >
            {imageArray.map((element, index) => (
              <motion.li
                key={index}
                className="w-[--w] shrink-0 select-none bg-[image:--bg-image] bg-cover [&:not(:first-child)]:ml-10"
                style={
                  {
                    height: "min(var(--h), calc(100vh - 1.25rem))",
                    "--bg-image": `url('${element}')`,
                  } as CSSProperties
                }
              />
            ))}
            <div className="h-1 w-[--px] shrink-0 bg-transparent" />
          </motion.ul>
        </ScrollerMotion>
      </main>
    </>
  );
}
