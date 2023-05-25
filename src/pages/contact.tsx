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
          <div className="flex min-h-screen items-center px-[10vw]">
            <form action="" className="block">
              <Input placeholder="Your name" customClass="" />
              <Input placeholder="you@email.com" customClass="" type="email" />
              <Input
                placeholder="How can i help?"
                customClass=""
                type="textarea"
              />
              <input type="submit" value="Send" />
            </form>
          </div>
        </main>
      </MainLayout>
    </>
  );
}
