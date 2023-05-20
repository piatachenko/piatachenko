import { motion } from "framer-motion";
import Head from "next/head";
import { useEffect, type CSSProperties } from "react";
import { ScrollerMotion } from "scroller-motion";
import MainLayout from "~/layouts/MainLayout";

const imageArray = [
  "/assets/2461288.jpg",
  "/assets/2461292.jpg",
  "/assets/2461294.jpg",
  "/assets/2461302.jpg",
  "/assets/2461309.jpg",
  "/assets/2461313.jpg",
  "/assets/8302965.jpg",
];

export default function Iframe() {
  // const [windowWidth, setWindowWidth] = useState(0);

  // useEffect(() => {
  //   function updateWindowWidth() {
  //     setWindowWidth(window.innerWidth);
  //   }

  //   updateWindowWidth();
  //   window.addEventListener("resize", updateWindowWidth);

  //   return () => {
  //     window.removeEventListener("resize", updateWindowWidth);
  //   };
  // }, []);

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

  const scale = 2;

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
      <Head>
        <title>IP: Work</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout page="Work">
        <main>
          <ScrollerMotion scale={scale}>
            <motion.ul
              className="flex min-h-screen items-center pl-[--px]"
              style={{ "--px": "calc(50vw - 10rem)" } as CSSProperties}
            >
              {imageArray.map((element, index) => (
                <motion.li
                  key={index}
                  className="h-[30rem] w-[20rem] shrink-0 select-none bg-[image:--bg-image] bg-cover bg-[var(--bg-x-position)_center] [&:not(:first-of-type)]:ml-10"
                  style={
                    {
                      "--bg-image": `url('${element}')`,
                    } as CSSProperties
                  }
                />
              ))}
              <div className="h-1 w-[--px] shrink-0 bg-transparent" />
            </motion.ul>
          </ScrollerMotion>
          <div className="fixed bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 before:absolute before:bottom-1/2 before:right-1/2 before:block before:h-[.11rem] before:w-7 before:translate-x-1/2 before:translate-y-1/2 before:rotate-90 before:bg-white before:content-[''] after:absolute after:bottom-1/2 after:right-1/2 after:block after:h-[.11rem] after:w-7 after:translate-x-1/2 after:translate-y-1/2 after:bg-white after:content-['']" />
        </main>
      </MainLayout>
    </>
  );
}
