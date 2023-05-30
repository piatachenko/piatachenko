import Head from "next/head";
import { type FormEvent } from "react";
import Input from "~/components/Input";
import MainLayout from "~/layouts/MainLayout";

export default function Contact() {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      <Head>
        <title>IP: Contact</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout page="Contact">
        <main>
          <div
            className="px-[6%] pb-9 sm:px-[3rem] md:px-[7%] xl:px-[10%] 2xl:px-[13%]"
            style={{
              paddingTop:
                "calc((max(100vh, calc(var(--h) + 8rem)) - var(--h)) / 2)",
            }}
          >
            <form onSubmit={handleSubmit} className="w-full">
              <div className="gap-10 md:flex xl:gap-20 2xl:gap-24">
                <Input placeholder="Your name" />
                <Input placeholder="your@email.com" type="email" />
              </div>
              <Input placeholder="How can I help?" type="textarea" />
              <div className="flex flex-col justify-center mix-blend-difference">
                <button className="bg-zinc-100 p-2 text-4xl text-zinc-950 outline-none ring-zinc-500 ring-offset-2 ring-offset-zinc-950 hover:cursor-pointer focus:ring-2">
                  Send
                </button>
                <div className="mx-auto mt-10 text-sm">
                  Prefer email?{" "}
                  <a
                    href="mailto:ivan@piatachenko.com"
                    className="font-medium text-zinc-400 underline transition-all hover:text-zinc-100"
                  >
                    ivan@piatachenko.com
                  </a>
                </div>
              </div>
            </form>
          </div>
        </main>
      </MainLayout>
    </>
  );
}
