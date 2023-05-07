import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";

export default function Home() {
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef<boolean>(false);
  const dragData = useRef<{ startX: number; scrollLeft: number; lastTime: number; lastX: number; velocity: number }>({
    startX: 0,
    scrollLeft: 0,
    lastTime: 0,
    lastX: 0,
    velocity: 0,
  });

  const handleWheel = (e: WheelEvent) => {
    if (scrollContainer.current !== null) {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        scrollContainer.current.scrollLeft += e.deltaY * 0.5;
        e.preventDefault();
      } else {
        scrollContainer.current.scrollLeft += e.deltaX * 0.5;
      }
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    isDragging.current = true;
    dragData.current.startX = e.clientX;
    if (scrollContainer.current) {
      dragData.current.scrollLeft = scrollContainer.current.scrollLeft;
    }
    dragData.current.lastTime = Date.now();
    dragData.current.lastX = e.clientX;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
  
    if (scrollContainer.current) {
      const deltaX = e.clientX - dragData.current.startX;
      scrollContainer.current.scrollLeft = dragData.current.scrollLeft - deltaX;
  
      const currentTime = Date.now();
      const timeDelta = currentTime - dragData.current.lastTime;
      const positionDelta = dragData.current.lastX - e.clientX;
  
      dragData.current.velocity = positionDelta / timeDelta;
      dragData.current.lastTime = currentTime;
      dragData.current.lastX = e.clientX;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;

    isDragging.current = false;
    applyInertia();
  };

  const applyInertia = () => {
    if (!scrollContainer.current) return;

    const friction = 0.96;

    const animate = () => {
      if (!scrollContainer.current) return;

      scrollContainer.current.scrollLeft += dragData.current.velocity;
      dragData.current.velocity *= friction;

      if (Math.abs(dragData.current.velocity) > 0.5) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
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
          ref={scrollContainer}
          className="absolute bottom-1/2 flex w-full [&::-webkit-scrollbar]:hidden translate-y-1/2 gap-10 overflow-x-auto px-[--px]"
          style={{ "--px": "calc(50vw - 12.5rem)" } as CSSProperties}
        >
          <Image
            src="/assets/2461288.jpg"
            alt=""
            className="h-[20rem] w-[40rem] object-cover"
            width={1920}
            height={600}
            draggable="false"
          />
          <Image
            src="/assets/2461292.jpg"
            alt=""
            className="h-[20rem] w-[40rem] object-cover"
            width={1920}
            height={600}
            draggable="false"
          />
          <Image
            src="/assets/2461294.jpg"
            alt=""
            className="h-[20rem] w-[40rem] object-cover"
            width={1920}
            height={600}
            draggable="false"
          />
          <Image
            src="/assets/2461302.jpg"
            alt=""
            className="h-[20rem] w-[40rem] object-cover"
            width={1920}
            height={600}
            draggable="false"
          />
          <Image
            src="/assets/2461309.jpg"
            alt=""
            className="h-[20rem] w-[40rem] object-cover"
            width={1920}
            height={600}
            draggable="false"
          />
          <Image
            src="/assets/2461313.jpg"
            alt=""
            className="h-[20rem] w-[40rem] object-cover"
            width={1920}
            height={600}
            draggable="false"
          />
          <Image
            src="/assets/8302965.jpg"
            alt=""
            className="h-[20rem] w-[40rem] object-cover"
            width={1920}
            height={600}
            draggable="false"
          />
        </div>
        <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 before:absolute before:bottom-1/2 before:right-1/2 before:block before:h-[.11rem] before:w-7 before:translate-x-1/2 before:translate-y-1/2 before:rotate-90 before:bg-white before:content-[''] after:absolute after:bottom-1/2 after:right-1/2 after:block after:h-[.11rem] after:w-7 after:translate-x-1/2 after:translate-y-1/2 after:bg-white after:content-['']" />
      </main>
    </>
  );
}
