"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Logo } from "../../icons/logo";
import { ThemeSwitcher } from "../theme/theme-switcher";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { useState } from "react";
import { NavSearch } from "./nav-search";

export function NavbarCustom() {
  const { data: session } = useSession() || {};
  const router = useRouter();
  const params = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems: string[] = [
    "Home",
    "Category",
    "Collection",
    "Bookmark",
    "Login",
  ];

  const getButtonStyles1 = (index: number) => {
    if (index === 4) {
      return session ? "bg-danger text-background" : "bg-primary text-background";
    }
    return "hover:bg-primary hover:text-background";
  };

  const getButtonStyles2 = (index: number, item: string) => {
    if (index === 4) {
      return session ? "Log Out" : "Log In";
    }
    return item;
  };

  return (
    <Navbar isBordered maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="lg:hidden"
      />
      <Link href="/">
        <NavbarContent justify="start">
          <NavbarBrand className="sm:mr-4">
            <Logo className="hidden sm:block" />
            <p className="hidden md:block font-bold text-inherit sm:ml-2">
              Digital Library
            </p>
          </NavbarBrand>
        </NavbarContent>
      </Link>

      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        <NavbarItem isActive={params === "/"}>
          <Link className={params === "/" ? "text-primary-500" : ""} href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={params === "/categories"}>
          <Link
            className={params === "/categories" ? "text-primary-500" : ""}
            href="/categories"
          >
            Category
          </Link>
        </NavbarItem>
        <NavbarItem isActive={params.includes("/collection/")}>
          <Link
            className={
              params.includes("/collection/") ? "text-primary-500" : ""
            }
            href="/collection/10"
          >
            Collection
          </Link>
        </NavbarItem>
        <NavbarItem isActive={params === "/cart"}>
          <Link
            className={params === "/cart" ? "text-primary-500" : ""}
            href="/cart"
          >
            Cart
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <ThemeSwitcher />
        <NavSearch />
        <Button
          key={!session ? "login" : "logout"}
          color={!session ? "primary" : "danger"}
          onPress={() => {
            if (!session) {
              router.push("/signin/" + params);
            } else {
              void signOut();
            }
          }}
          className="hidden sm:block"
        >
          {!session ? "Log In" : "Log Out"}
        </Button>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <button
              className={
                `w-full rounded-md px-1 ` + getButtonStyles1(index)
              }
              onClick={() => {
                setIsMenuOpen(false);
                if (index === 0) router.push("/");
                else if (index === 1) router.push("/categories");
                else if (index === 2) router.push("/collection/10");
                else if (index === 3) router.push("/cart");
                else if (index === 4) {
                  if (!session) {
                    router.push("/signin/" + params);
                  } else {
                    void signOut();
                  }
                }
              }}
            >
              {getButtonStyles2(index, item)}
            </button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
