"use client";

import { useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
} from "@nextui-org/react";
import { Logo } from "../../icons/logo";
import { Search } from "../../icons/search";
import { Cart } from "../../icons/cart";
import { ThemeSwitcher } from "../theme/themeSwitcher";
import { Github } from "../../icons/github";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export function NavbarCustom() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = usePathname();
  return (
    <Navbar isBordered maxWidth="full">
      <Link href="/">
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <Logo />
            <p className="sm:block font-bold text-inherit ml-2">
              Digital Library
            </p>
          </NavbarBrand>
        </NavbarContent>
      </Link>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
            href="/collection/all"
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
        <Button
          isIconOnly
          onPress={() =>
            window.open("https://github.com/CVamsi27/digital-library", "_blank")
          }
        >
          <Github />
        </Button>
        <Input
          className="max-w-xs"
          label="Search"
          isClearable
          radius="lg"
          size="sm"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
          }}
          placeholder="Type to search..."
          startContent={
            <Search className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Button isIconOnly onPress={() => router.push("/cart")}>
          <Cart />
        </Button>

        {session ? (
          <Button
            key="logout"
            color="danger"
            onPress={async () => {
              const data = await signOut();
              console.log(data);
              router.push("/signin");
            }}
          >
            Log Out
          </Button>
        ) : (
          <Button
            key="logout"
            color="primary"
            onPress={() => {
              signIn();
              router.push("/signin");
            }}
          >
            Log In
          </Button>
        )}
      </NavbarContent>
    </Navbar>
  );
}
