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
              <div className="flex justify-center mix-blend-difference">
                <input
                  type="submit"
                  value="Send"
                  className="-mt-5 translate-y-5 p-4 text-center text-3xl"
                />
              </div>
            </form>
          </div>
        </main>
      </MainLayout>
    </>
  );
}
