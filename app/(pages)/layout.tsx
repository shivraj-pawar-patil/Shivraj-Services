"use client"
import { Navbar } from "@/components/Navbar"
import SideBar from "../SideBar"
import { useEffect, useState } from "react"
import clsx from "clsx"

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Optional: sync with system preference or use localStorage
    const storedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark"
    localStorage.setItem("theme", newTheme)
    setIsDark(!isDark)

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <div className={clsx("flex h-[100dvh] overflow-hidden bg-white text-black dark:bg-gray-900 dark:text-white")}>
      <SideBar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Pass toggleTheme to Navbar if needed */}
        <Navbar toggleTheme={toggleTheme} isDark={isDark} />
        <main className="grow [&>*:first-child]:scroll-mt-16">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DefaultLayout
