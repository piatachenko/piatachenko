import Head from "next/head";
import Input from "~/components/Input";
import MainLayout from "~/layouts/MainLayout";

export default function Contact() {
  return (
    <>
      <Head>
        <title>IP: Contact</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout page="Contact">
        <main>
          <div className="flex min-h-screen items-center px-[2rem] py-[10rem] sm:px-[3rem] md:px-[7%] xl:px-[10%] 2xl:px-[13%]">
            <form action="" className="w-full">
              <div className="gap-10 md:flex xl:gap-20 2xl:gap-24">
                <Input placeholder="Your name" />
                <Input placeholder="your@email.com" type="email" />
              </div>
              <Input placeholder="How can I help?" type="textarea" />
              <div className="flex flex-col justify-center mix-blend-difference">
                <button className="bg-zinc-100 p-4 text-4xl text-zinc-950 outline-none ring-zinc-500 ring-offset-2 ring-offset-zinc-950 hover:cursor-pointer focus:ring-2">
                  Send
                </button>
              </div>
            </form>
          </div>
        </main>
      </MainLayout>
    </>
  );
}
