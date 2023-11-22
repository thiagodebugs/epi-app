"use client";

import { Navbar } from "@/components";

export default function LoggedLayout({ children }) {
  return <Navbar option="home">{children}</Navbar>;
}
