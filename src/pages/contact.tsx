import Head from "next/head";
import { useState, type FormEvent } from "react";
import Input from "~/components/Input";
import MainLayout from "~/layouts/MainLayout";

export default function Contact() {
  const fieldNames = ["name", "email", "message"];

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);

  function resetStates() {
    setIsSuccess(false);
    setIsFailure(false);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    let hasError = false;

    fieldNames.forEach((fieldName) => {
      const fieldElement = (e.target as HTMLElement)[
        fieldName as keyof HTMLElement
      ];
      if (
        fieldElement instanceof HTMLInputElement ||
        fieldElement instanceof HTMLTextAreaElement
      ) {
        if (!fieldElement.value) {
          fieldElement.classList.add("is-empty");
          hasError = true;
          return;
        }

        if (fieldName === "email" && !emailPattern.test(fieldElement.value)) {
          fieldElement.classList.add("is-invalid");
          hasError = true;
          return;
        }
      }
    });

    if (hasError) {
      return;
    }

    setIsSending(true);

    const formData = new FormData(e.target as HTMLFormElement);

    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setIsSending(false);
          setIsSuccess(true);
        } else {
          setIsSending(false);
          setIsFailure(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsSending(false);
        setIsFailure(true);
      });
  }

  return (
    <>
      <Head>
        <title>IP: Contact</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="desctiption" content="Get in touch with Ivan Piatachenko. Find contact information and connect for inquiries about web development and design projects." />
      </Head>
      <MainLayout page="Contact">
        <main>
          <div
            className="px-[6%] pb-10 sm:px-[3rem] md:px-[7%] xl:px-[10%] 2xl:px-[13%]"
            style={{
              paddingTop:
                "calc((max(102.5vh, calc(var(--h) + 8rem)) - var(--h)) / 2)",
            }}
          >
            <form onSubmit={handleSubmit} className="w-full">
              <div className="gap-10 md:flex xl:gap-20 2xl:gap-24">
                <Input
                  placeholder="Your name"
                  id="name"
                  name="name"
                  handleChange={resetStates}
                  isSuccess={isSuccess}
                />
                <Input
                  placeholder="your@email.com"
                  id="email"
                  name="email"
                  handleChange={resetStates}
                  isSuccess={isSuccess}
                />
              </div>
              <Input
                placeholder="How can I help?"
                type="textarea"
                id="message"
                name="message"
                handleChange={resetStates}
                isSuccess={isSuccess}
              />
              <div className="flex flex-col justify-center mix-blend-difference">
                <button
                  className={`bg-zinc-100 p-2 text-4xl text-zinc-950 outline-none ring-zinc-500 ring-offset-2 ring-offset-zinc-950 hover:cursor-pointer focus:ring-2 disabled:cursor-auto ${
                    isSending
                      ? "btn-loading"
                      : isSuccess
                      ? "btn-success"
                      : isFailure
                      ? "btn-destructive"
                      : ""
                  }`}
                  disabled={isSending || isSuccess || isFailure}
                >
                  {isSending ? (
                    <>
                      Sending<span className="wait-dot">.</span>
                      <span className="wait-dot">.</span>
                      <span className="wait-dot">.</span>
                    </>
                  ) : isSuccess ? (
                    "Success! Appreciate your message. I'll be in touch soon."
                  ) : isFailure ? (
                    "Something went wrong"
                  ) : (
                    "Send"
                  )}
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
