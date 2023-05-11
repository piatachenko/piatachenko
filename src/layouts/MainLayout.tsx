import { type ReactNode } from "react";
import Navbar from "~/components/Navbar";

interface MainLayoutProps {
  children: ReactNode;
  page?: string;
}

export default function MainLayout({ children, page }: MainLayoutProps) {
  return (
    <>
      <Navbar page={page} />
      {children}
    </>
  );
}
