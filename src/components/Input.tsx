import { useRef, type CSSProperties } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface InputProps {
  placeholder?: string;
  type?: string;
}

export default function Input({ placeholder, type }: InputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const duration = 700;

  function onChange() {
    const input = inputRef.current ?? textareaRef.current;
    const div = divRef.current;
    if (input && div) {
      if (input.value) {
        div.classList.remove("slide-out");
        div.classList.add("slide-in");
      }
      if (!input.value) {
        div.classList.add("slide-out");
        div.classList.remove("slide-in");
      }
    }
  }

  return (
    <>
      <div
        ref={divRef}
        style={{ "--duration": `${duration}ms` } as CSSProperties}
        className="relative mb-16 block w-full pb-2 text-4xl after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-0 after:bg-zinc-100 after:content-[''] md:mb-20 lg:mb-24 xl:mb-28"
      >
        {type === "textarea" ? (
          <TextareaAutosize
            minRows={3}
            maxRows={9}
            ref={textareaRef}
            placeholder={placeholder}
            onChange={onChange}
            style={{ height: 160 }} // (minRows + 1) * line-height
            className="w-full resize-none bg-transparent outline-none"
          />
        ) : (
          <input
            ref={inputRef}
            type={"text"}
            placeholder={placeholder}
            onChange={onChange}
            className="w-full bg-transparent outline-none"
          />
        )}
      </div>
    </>
  );
}
