import { useRef, type CSSProperties } from "react";

interface InputProps {
  placeholder?: string;
  customClass?: string;
}

export default function Input({ placeholder, customClass }: InputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const duration = 700;

  function onChange() {
    const input = inputRef.current;
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
        <input
          ref={inputRef}
          type={"text"}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full bg-transparent outline-none ${customClass}`}
        />
      </div>
    </>
  );
}
