"use client"
import { Navbar } from "@/components/Navbar"
import SideBar from "../SideBar"
import { useMobileMenu } from "@/hooks/useMobileMenu"

import { usePathname } from "next/navigation"

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, toggle, close } = useMobileMenu()
  const pathname = usePathname()
  const isLandingPage = pathname === "/"

  if (isLandingPage) {
    return (
      <main className="min-h-screen bg-background">
        {children}
      </main>
    )
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-background text-foreground">
      <SideBar isOpen={isOpen} onToggle={toggle} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Navbar onMenuToggle={toggle} />
        <main className="grow [&>*:first-child]:scroll-mt-16">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DefaultLayout
