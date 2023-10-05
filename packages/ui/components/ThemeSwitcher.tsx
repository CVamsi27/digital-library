'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { Switch } from "@nextui-org/react";

import { MoonIcon } from './icons/MoonIcon';
import { SunIcon } from './icons/SunIcon';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  const defaultSelected = false;
  return (
    <Switch
      defaultSelected = {defaultSelected}
      size="lg"
      color="default"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      onValueChange={(isSelected: boolean) => {
        if (isSelected) {
          setTheme('light')
        } else {
          setTheme('dark')
        }
      }}
    >
    </Switch>
  )
}
