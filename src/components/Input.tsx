import { useRef, type CSSProperties } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface InputProps {
  placeholder?: string;
  type?: string;
  customClass?: string;
}

export default function Input({ placeholder, type, customClass }: InputProps) {
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
        className="relative mb-10 block pb-2 text-4xl after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-0 after:bg-white after:content-['']"
      >
        {type === "textarea" ? (
          <TextareaAutosize
            minRows={5}
            maxRows={9}
            ref={textareaRef}
            placeholder={placeholder}
            onChange={onChange}
            style={{ height: 240 }} // (minRows + 1) * line-height
            className={`w-full pb-10 bg-transparent resize-none outline-none ${customClass}`}
          />
        ) : (
          <input
            ref={inputRef}
            type={"text"}
            placeholder={placeholder}
            onChange={onChange}
            className={`w-full bg-transparent outline-none ${customClass}`}
          />
        )}
      </div>
    </>
  );
}
