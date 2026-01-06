"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { X, LayoutDashboard, Users, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";

interface SideBarProps {
  isOpen: boolean;
  onToggle: () => void;
}

function SideBar({ isOpen, onToggle }: SideBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();

  const sidebar = [
    {
      path: "/users",
      name: "Patients",
      icon: Users,
    },
    {
      path: "/analytics",
      name: "Analytics",
      icon: LayoutDashboard,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50",
        "transform transition-transform duration-300 ease-in-out",
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        "w-64 border-r bg-card print:hidden flex flex-col justify-between"
      )}>
        <div className="flex flex-col h-full bg-card bg-muted/10">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 lg:hidden border-b bg-background">
            <div className="flex items-center gap-2">
              <Image
                width={32}
                height={32}
                src="https://merakiui.com/images/logo.svg"
                alt="Logo"
              />
              <span className="font-bold text-lg">Eye Optical Services</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Desktop Logo */}
          <div className="hidden lg:flex items-center gap-3 px-6 py-8 border-b border-border/50">
            <Image
              width={32}
              height={32}
              src="https://merakiui.com/images/logo.svg"
              alt="Eye Optical Services"
              className="w-8 h-8"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none">Eye Optical Services</span>
              <span className="text-xs text-muted-foreground">Practice Management</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebar.map((item) => {
              const isActive = pathname.startsWith(item.path);
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-border/50 space-y-4 bg-background/50">
            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-medium text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
            <div className="pt-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={() => signOut(() => router.push("/"))}
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
