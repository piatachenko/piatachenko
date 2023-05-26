import Link from "next/link";
import { type CSSProperties } from "react";

const pages = ["Work", "Contact"];

interface NavbarProps {
  page?: string;
}

export default function Navbar({ page }: NavbarProps) {
  return (
    <>
      <nav
        className="fixed mix-blend-difference right-1/2 top-[--top] z-10 translate-x-1/2"
        style={{ "--top": `calc((100vh - var(--h)) / 5)` } as CSSProperties}
      >
        <div className="flex gap-10">
          {pages.map((element, id) => (
            <Link
              key={element + id.toString()}
              className={
                page === element
                  ? "pointer-events-none"
                  : "ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] opacity-30 transition-opacity duration-300 hover:opacity-100"
              }
              href={element === "Work" ? "/" : `/${element.toLowerCase()}`}
            >
              {element}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
