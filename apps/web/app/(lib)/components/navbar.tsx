"use client";
import { NavbarCustom } from "ui";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  return <NavbarCustom />;
}
