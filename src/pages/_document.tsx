import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-[#0D0D0D] text-zinc-100 [&::-webkit-scrollbar]:[&:has(.iframe)]:hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
