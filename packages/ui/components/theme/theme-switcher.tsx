"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Switch } from "@nextui-org/react";

import { Moon } from "../../icons/moon";
import { Sun } from "../../icons/sun";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const defaultSelected = false;
  return (
    <Switch
      defaultSelected={defaultSelected}
      size="lg"
      color="default"
      startContent={<Sun />}
      endContent={<Moon />}
      onValueChange={(isSelected: boolean) => {
        if (isSelected) {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      }}
      // className="hidden sm:visible"
    ></Switch>
  );
}
