import { motion, useMotionValue } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const imageArray = [
    "/assets/2461288.jpg",
    "/assets/2461292.jpg",
    "/assets/2461294.jpg",
    "/assets/2461302.jpg",
    "/assets/2461309.jpg",
    "/assets/2461313.jpg",
    "/assets/8302965.jpg",
  ];

  const width = 300;
  const gap = 40;
  const scrollX = useMotionValue(0);
  const paddingValue = `0 calc(50vw - ${width / 2}px)`;

  const [, paddingBlock, paddingInline] = paddingValue.match(
    /^([\d\s.-]+)\s+([\w\s().+-]+)$/
  );

  function calcToPx(expression:any) {
    const regex = /calc\(([\d.]+)vw\s*-\s*([\d.]+)px\)/;
    const [, vwValue, pixelValue] = expression.match(regex);

    const pixels =
      parseFloat(vwValue) * (windowWidth / 100) - parseFloat(pixelValue);
    return pixels;
  }


  function getWidth(items: any) {
    const totalWidth = items.length * width;
    const totalGap = (items.length - 1) * gap;
    const totalScroll = totalWidth + totalGap + calcToPx(paddingInline) * 2;
    return totalScroll;
  }

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleWheel = (e: WheelEvent) => {
    if (containerRef.current !== null) {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        containerRef.current.scrollLeft += e.deltaY * 0.5;
        e.preventDefault();
      } else {
        containerRef.current.scrollLeft += e.deltaX * 0.5;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
      <Head>
        <title>IP: Work</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative min-h-screen">
        <div
          ref={containerRef}
          className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden"
        >
          <motion.div
            drag="x"
            dragConstraints={{
              left: -getWidth(imageArray) + windowWidth,
              right: 0,
            }}
            style={{
              width: getWidth(imageArray),
              x: scrollX,
              gap: gap,
              padding: paddingValue,
            }}
            className="flex min-h-screen items-center"
          >
            {imageArray.map((element, index) => (
              <Image
                key={index}
                src={element}
                alt=""
                draggable="false"
                className="w-[4 0rem] h-[20rem] select-none object-cover"
                style={{ width: width }}
                width={1920}
                height={600}
              />
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 before:absolute before:bottom-1/2 before:right-1/2 before:block before:h-[.11rem] before:w-7 before:translate-x-1/2 before:translate-y-1/2 before:rotate-90 before:bg-white before:content-[''] after:absolute after:bottom-1/2 after:right-1/2 after:block after:h-[.11rem] after:w-7 after:translate-x-1/2 after:translate-y-1/2 after:bg-white after:content-['']" />
      </main>
    </>
  );
}
