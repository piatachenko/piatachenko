import Head from "next/head";
import MainLayout from "~/layouts/MainLayout";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Ivan Piatachenko</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout page="Contact">
        <main></main>
      </MainLayout>
    </>
  );
}
