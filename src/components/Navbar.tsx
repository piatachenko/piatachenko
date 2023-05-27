import Link from "next/link";

const pages = ["Work", "Contact"];

interface NavbarProps {
  page?: string;
}

export default function Navbar({ page }: NavbarProps) {
  return (
    <>
      <nav
        className="fixed right-1/2 z-10 -translate-y-1/2 translate-x-1/2 mix-blend-difference"
        style={{
          top: "max(calc((100vh - var(--h)) / 4), 2rem)",
        }}
      >
        {pages.map((element, id) => (
          <Link
            key={element + id.toString()}
            className={
              page === element
                ? "pointer-events-none mx-5"
                : "ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] mx-5 opacity-30 transition-opacity duration-300 hover:opacity-100"
            }
            href={element === "Work" ? "/" : `/${element.toLowerCase()}`}
          >
            {element}
          </Link>
        ))}
      </nav>
    </>
  );
}
