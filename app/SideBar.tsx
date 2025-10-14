import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface SideBarProps {
  isOpen: boolean;
  onToggle: () => void;
}

function SideBar({ isOpen, onToggle }: SideBarProps) {
  const sidebar = [
    {
      path: "/users",
      name: "User",
      Image: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
      ),
    },
    {
      path: "/analytics",
      name: "Analytics",
      Image: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            strokeLinejoin="round"
            d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
          />
        </svg>
      ),
    },
    {
      path: "/theme-demo",
      name: "Theme Demo",
      Image: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      ),
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
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64 lg:w-fit
        border-r print:hidden
      `}>
        <div className="flex flex-col h-full bg-card border-border theme-transition">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 lg:hidden border-b">
            <Image
              width={12}
              height={12}
              className="w-auto h-6"
              src="https://merakiui.com/images/logo.svg"
              alt="ShivRaj Services"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Desktop Logo */}
          <div className="hidden lg:flex items-center justify-center py-8">
            <Image
              width={12}
              height={12}
              className="w-auto h-6"
              src="https://merakiui.com/images/logo.svg"
              alt="ShivRaj Services"
            />
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col px-4 lg:px-0 lg:items-center space-y-2 lg:space-y-8 py-4 lg:py-8">
            {sidebar.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => {
                  // Close mobile menu when navigating
                  if (window.innerWidth < 1024) {
                    onToggle();
                  }
                }}
                className={`
                  flex items-center space-x-3 lg:space-x-0
                  px-3 py-2 lg:pl-6 lg:pr-6 lg:pb-1.5 lg:pt-1.5
                  text-muted-foreground 
                  focus:outline-none transition-colors duration-200 
                  rounded-lg hover:bg-accent hover:text-accent-foreground
                  w-full lg:w-auto
                `}
              >
                <span className="flex-shrink-0">{item.Image}</span>
                <span className="lg:hidden text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Theme Toggle */}
          <div className="px-4 py-2 lg:hidden border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
