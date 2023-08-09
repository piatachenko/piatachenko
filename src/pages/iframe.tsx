import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ScrollerMotion } from "scroller-motion";

import abletonImg from "../../public/assets/ableton.webp";
import backstageImg from "../../public/assets/backstage-talks.webp";
import instrumentImg from "../../public/assets/instrument.webp";
import lobeImg from "../../public/assets/lobe-ai.webp";
import ohImg from "../../public/assets/oh-studio.webp";
import sketchImg from "../../public/assets/sketch.webp";

export const projects = [
  {
    image: sketchImg,
    demo: "https://sketch-apps-page-clone.vercel.app/",
    code: "https://github.com/piatachenko/sketch-apps-page-clone",
    logo: "/assets/sketch-logo.png",
  },
  {
    image: instrumentImg,
    demo: "https://instrument-com-clone.vercel.app/",
    code: "https://github.com/piatachenko/instrument-com-clone",
    logo: "/assets/instrument-logo.svg",
  },
  {
    image: lobeImg,
    demo: "https://lobeai-clone.vercel.app/",
    code: "https://github.com/piatachenko/lobe-ai-tour-page-next-sass-clone",
    logo: "/assets/lobe-ai-logo.svg",
  },
  {
    image: ohImg,
    demo: "https://ohstudio-clone.vercel.app/",
    code: "https://github.com/piatachenko/oh-studio-next-clone",
    logo: "/assets/oh-studio-logo.svg",
  },
  {
    image: backstageImg,
    demo: "https://backstage-talks-next.vercel.app/",
    code: "https://github.com/piatachenko/backstage-talks-next-clone",
    logo: "/assets/backstage-talks-logo.png",
  },
  {
    image: abletonImg,
    demo: "https://ableton-nextjs.vercel.app/",
    code: "https://github.com/piatachenko/ableton-homepage-nextjs-clone",
    logo: "/assets/ableton-logo.svg",
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
                  <div className="absolute inset-0 -z-10 transition-opacity duration-[.4s] group-hover:opacity-40">
                    <Image
                      src={element.image}
                      alt={""}
                      placeholder="blur"
                      className="h-full object-cover object-top"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 -z-30 flex flex-col items-center justify-around py-7 opacity-0 transition-all duration-[.2s] group-hover:z-0 group-hover:opacity-100">
                  <div
                    className="h-8 w-9/12 bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${element.logo})` }}
                  />
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
                    className="py-1 underline"
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
