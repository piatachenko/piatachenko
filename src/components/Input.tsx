import { useEffect, useRef, type ChangeEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface InputProps {
  type?: string;
  placeholder?: string;
  id?: string;
  name?: string;
}

export default function Input({ type, ...props }: InputProps) {
  const divRef = useRef<HTMLDivElement | null>(null);

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.target.classList.remove("error-input");
    const div = divRef.current;
    if (e.target && div) {
      if (e.target.value) {
        div.classList.remove("slide-out");
        div.classList.add("slide-in");
      }
      if (!e.target.value) {
        div.classList.add("slide-out");
        div.classList.remove("slide-in");
      }
    }
  }

  useEffect(() => {
    const observer = new MutationObserver((_, observer) => {
      const el = document.querySelector("div[contenteditable]");
      if (el) {
        el.setAttribute("tabIndex", "-1");
        observer.disconnect();
      }
    });
    observer.observe(document, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={divRef}
        className="container-input relative mb-16 block w-full pb-2 text-4xl after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-0 after:bg-zinc-100 after:content-[''] md:mb-20 lg:mb-24 xl:mb-28"
      >
        {type === "textarea" ? (
          <TextareaAutosize
            minRows={3}
            maxRows={9}
            {...props}
            onChange={onChange}
            style={{ height: 160 }} // (minRows + 1) * line-height
            className="w-full resize-none bg-transparent placeholder-zinc-400 outline-none"
          />
        ) : (
          <input
            type={"text"}
            {...props}
            onChange={onChange}
            className="w-full bg-transparent placeholder-zinc-400 outline-none"
          />
        )}
      </div>
    </>
  );
}
