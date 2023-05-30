import { motion } from "framer-motion";
import { useEffect } from "react";
import { ScrollerMotion } from "scroller-motion";

export const imageArray = [
  "/assets/instrument.webp",
  "/assets/lobe-ai.webp",
  "/assets/oh-studio.webp",
  "/assets/backstage-talks.webp",
  "/assets/ableton.webp",
];

export default function Iframe() {
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
        <ScrollerMotion scale={1.25}>
          <motion.ul
            className="flex min-h-screen items-center"
            style={{
              paddingInline: "calc(50vw - var(--w) / 2)",
            }}
          >
            {imageArray.map((element, index) => (
              <motion.li
                key={index}
                className="w-[--w] shrink-0 select-none bg-cover [&:not(:first-child)]:ml-10"
                style={{
                  height: "min(var(--h), calc(100vh - 1.25rem))",
                  backgroundImage: `url('${element}')`,
                }}
              />
            ))}
            <div
              className="h-1 shrink-0 bg-transparent"
              style={{
                width: "calc(50vw - var(--w) / 2)",
              }}
            />
          </motion.ul>
        </ScrollerMotion>
      </main>
    </>
  );
}
