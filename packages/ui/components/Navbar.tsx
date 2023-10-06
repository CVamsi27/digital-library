"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "./Logo";
import { SearchIcon } from "./icons/SearchIcon";
import { CartIcon } from "./icons/CartIcon";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { GitHubIcon } from "./icons/GitHubIcon";

export function NavbarCustom() {
  const isBordered = false;
  return (
    <Navbar isBordered={isBordered} maxWidth="full">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <AcmeLogo />
          <p className="sm:block font-bold text-inherit ml-2">
            Digital-Library
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <ThemeSwitcher />
        <Button
          isIconOnly
          onPress={() =>
            window.open("https://github.com/CVamsi27/digital-library", "_blank")
          }
        >
          <GitHubIcon />
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
            <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Button isIconOnly>
          <CartIcon />
        </Button>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              className="transition-transform"
              name="Vamsi Krishna"
              size="md"
              src="https://www.rizzgpt.app/_next/image?url=https%3A%2F%2Frizz-public-assets.s3.us-west-2.amazonaws.com%2Fimages%2Fee709eb9-1a2b-4f4a-95f1-a0b4f642696f.png&w=3840&q=75"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">cvamsik99@gmail.com</p>
            </DropdownItem>
            <DropdownItem key="profile">My Profile</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
