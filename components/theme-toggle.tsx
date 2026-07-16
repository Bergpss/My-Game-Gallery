"use client"

import * as React from "react"
import { Moon, Sun } from "@phosphor-icons/react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="theme-toggle opacity-0" aria-hidden="true" tabIndex={-1}>
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className="theme-toggle"
      aria-label={resolvedTheme === "light" ? "切换到深色主题" : "切换到浅色主题"}
    >
      <Sun className="theme-icon theme-icon-light" weight="regular" aria-hidden="true" />
      <Moon className="theme-icon theme-icon-dark" weight="regular" aria-hidden="true" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
