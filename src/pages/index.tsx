import Head from "next/head";
import Image from "next/image";
import { type CSSProperties } from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>IP: Work</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative min-h-screen">
        <div
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
