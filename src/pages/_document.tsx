import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-black/95 font-['Arimo'] text-zinc-100 [&:has(.iframe)]:bg-transparent [&::-webkit-scrollbar]:[&:has(.iframe)]:hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
