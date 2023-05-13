import { animate, motion, useMotionValue } from "framer-motion";
import Head from "next/head";
import { useEffect, useRef, useState, type CSSProperties } from "react";
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

export default function Home() {
  const handleWheel = (e: WheelEvent) => {
    if (ref.current !== null) {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        ref.current.scrollLeft += e.deltaY * 0.3; // Change the multiplier value
        e.preventDefault();
      } else {
        ref.current.scrollLeft += e.deltaX * 0.3; // Change the multiplier value
      }
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const ref = useRef<HTMLUListElement>(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [trackMouse, setTrackMouse] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);
  const [lastDragVelocity, setLastDragVelocity] = useState(0);
  const [bgXPositions, setBgXPositions] = useState(() => {
    return imageArray.map((_, index) => {
      const parallaxSpeed = 0.02;
      const elementWidth = 360; // Element width in pixels (20rem converted to pixels)
      const elementScrollPercentage = (-index * elementWidth) / elementWidth;
      const parallaxOffset = elementScrollPercentage * parallaxSpeed * 100;
  
      return 50 + parallaxOffset;
    });
  });
  

  const x = useMotionValue(0);

  const handleMouseMove = (e: React.PointerEvent<HTMLUListElement>) => {
    if (!ref.current) return;
    if (!trackMouse) return;

    const xVal = e.pageX - ref.current.offsetLeft;
    const walk = (xVal - startX) * 1; //scroll-fast
    const newScrollLeft = scrollLeft - walk;

    const velocity = newScrollLeft - ref.current.scrollLeft;
    setLastDragVelocity(velocity);

    ref.current.scrollLeft = newScrollLeft;
  };

  const handleMouseDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (!ref.current) return;

    setTrackMouse(true);

    const startX = e.pageX - ref.current.offsetLeft;
    setStartX(startX);

    const scrollLeft = ref.current.scrollLeft;
    setScrollLeft(scrollLeft);
  };

  const handleMouseLeave = () => {
    setTrackMouse(false);
  };

  const handleMouseUp = (e: React.PointerEvent<HTMLUListElement>) => {
    setTrackMouse(false);
  
    if (!ref.current) return;
  
    const endX = e.pageX - ref.current.offsetLeft;
  
    // Check if the mouse has actually moved
    if (Math.abs(startX - endX) > 2) {
      const targetScrollLeft = ref.current.scrollLeft + lastDragVelocity * 10; // Adjust the multiplier for desired momentum
  
      void animate(ref.current.scrollLeft, targetScrollLeft, {
        type: "spring",
        stiffness: 112.5,
        damping: 20,
        velocity: lastDragVelocity,
        onUpdate: (val) => {
          if (!ref.current) return;
          ref.current.scrollLeft = val;
        },
        onComplete: () => {
          setAnimationComplete(true);
        },
        onStop: () => {
          setAnimationComplete(true);
        },
      });
    }
  };

  const handleScroll = () => {
    if (!ref.current) return;

    if (animationComplete) {
      x.set(ref.current.scrollLeft);
    }

    const scrollAmount = ref.current.scrollLeft;
    const parallaxSpeed = 0.02;
  
    const newBgXPositions = bgXPositions.map((_, index) => {
      const elementWidth = 360;
      const elementScrollPercentage = (scrollAmount - index * elementWidth) / elementWidth;
      const parallaxOffset = elementScrollPercentage * parallaxSpeed * 100;
  
      return 50 + parallaxOffset;
    });
  
    setBgXPositions(newBgXPositions);
  };

  return (
    <>
      <Head>
        <title>IP: Work</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout page="Work">
        <main className="relative min-h-screen">
          <motion.ul
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onScroll={handleScroll}
            className="absolute bottom-1/2 flex w-full translate-y-1/2 gap-10 overflow-x-auto px-[--px] [&::-webkit-scrollbar]:hidden"
            style={{ "--px": "calc(50vw - 10rem)" } as CSSProperties}
          >
            {imageArray.map((element, index) => (
              <motion.li
                key={index}
                className="h-[30rem] w-[20rem] shrink-0 select-none bg-[image:--bg-image] bg-cover bg-[var(--bg-x-position)_center]"
                style={{ "--bg-image": `url('${element}')`, "--bg-x-position": `${bgXPositions[index]}%` } as CSSProperties}
              />
            ))}
          </motion.ul>
          <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 before:absolute before:bottom-1/2 before:right-1/2 before:block before:h-[.11rem] before:w-7 before:translate-x-1/2 before:translate-y-1/2 before:rotate-90 before:bg-white before:content-[''] after:absolute after:bottom-1/2 after:right-1/2 after:block after:h-[.11rem] after:w-7 after:translate-x-1/2 after:translate-y-1/2 after:bg-white after:content-['']" />
        </main>
      </MainLayout>
    </>
  );
}
