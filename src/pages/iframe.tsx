import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { ScrollerMotion } from "scroller-motion";

export const projects = [
  {
    image: "/assets/instrument.webp",
    demo: "https://instrument-com-clone.vercel.app/",
    code: "https://github.com/piatachenko/instrument-com-clone",
  },
  {
    image: "/assets/lobe-ai.webp",
    demo: "https://lobeai-clone.vercel.app/",
    code: "https://github.com/piatachenko/lobe-ai-tour-page-next-sass-clone",
  },
  {
    image: "/assets/oh-studio.webp",
    demo: "https://ohstudio-clone.vercel.app/",
    code: "https://github.com/piatachenko/oh-studio-next-clone",
  },
  {
    image: "/assets/backstage-talks.webp",
    demo: "https://backstage-talks-next.vercel.app/",
    code: "https://github.com/piatachenko/backstage-talks-next-clone",
  },
  {
    image: "/assets/ableton.webp",
    demo: "https://ableton-nextjs.vercel.app/",
    code: "https://github.com/piatachenko/ableton-homepage-nextjs-clone",
  },
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
            {projects.map((element, index) => (
              <motion.li
                key={index}
                className="group relative shrink-0 [&:not(:first-child)]:ml-10 [&_*]:select-none"
                style={{
                  transitionDuration: "0s",
                  transitionDelay: "0s",
                  width: "var(--w)",
                  height: "min(var(--h), calc(100vh - 1.25rem))",
                }}
              >
                <div className="absolute inset-0 -z-20 group-hover:bg-black">
                  <div
                    className="absolute inset-0 -z-10 bg-cover transition-opacity duration-[.4s] group-hover:opacity-40 group-hover:delay-100"
                    style={{
                      backgroundImage: `url('${element.image}')`,
                    }}
                  />
                </div>
                <div className="absolute inset-0 -z-30 flex flex-col items-center justify-around py-7 opacity-0 transition-all duration-[.4s] group-hover:z-0 group-hover:opacity-100 group-hover:delay-100">
                  <div className="opacity-0">Logo</div>
                  <Link
                    href={element.demo}
                    target="_blank"
                    className="border-2 px-6 py-3"
                  >
                    Open Live
                  </Link>
                  <Link
                    href={element.code}
                    target="_blank"
                    className="underline"
                  >
                    Source Code
                  </Link>
                </div>
              </motion.li>
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
