import Link from "next/link";

const pages = ["Work", "Contact"];

interface NavbarProps {
  page?: string;
}

export default function Navbar({ page }: NavbarProps) {
  return (
    <>
      <nav className="fixed right-1/2 top-[7%] z-10 translate-x-1/2">
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
