import React from "react";
import Logo from "~/components/Logo";

export default function Navbar() {
  return (
    <>
      <nav className="fixed inset-x-0 top-0 px-20 py-10">
        <Logo />
      </nav>
    </>
  );
}
