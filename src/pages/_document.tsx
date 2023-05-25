import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-black/95 [&:has(.iframe)]:bg-transparent text-zinc-100 font-['Arimo']">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
