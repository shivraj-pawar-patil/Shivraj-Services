import Link from "next/link";
import Image from "next/image";
import React from "react";

function SideBar() {
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
  ];
  return (
    <>
      <aside className="flex">
        <div className="flex flex-col items-center w-fit h-screen py-8 space-y-8 bg-white dark:bg-[#182235] dark:border-slate-700">
            <Image
              width={12}
              height={12}
              className="w-auto h-6"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />

          {sidebar.map((_) => (
            <Link
              key={_.path}
              href={_.path}
              className="pl-6 pr-6 pb-1.5 pt-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100"
            >
             <div
             className="flex"
             ><span>{_.Image}</span></div>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}

export default SideBar;
