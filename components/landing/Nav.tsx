"use client";

import { track } from "@vercel/analytics/react";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DarkModeToggle from "../DarkModeToggle";

export default function Nav() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className="z-999 positioned bg-background/30 flex w-screen flex-wrap items-center p-3 backdrop-blur-xl ">
        <Link href="/" className="mr-4 inline-flex items-center p-2 ">
          <Image
            src="/images/icon_1024.png"
            width={75}
            height={75}
            alt="tapped logo"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Link>
        <button
          className="ml-auto inline-flex rounded p-3 outline-none hover:bg-blue-500 lg:hidden"
          onClick={handleClick}
        >
          <Menu />
        </button>
        {/* Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div
          className={`${
            active ? "" : "hidden"
          }   w-full lg:inline-flex lg:w-auto lg:flex-grow`}
        >
          <div className="flex w-full flex-col items-start lg:ml-auto lg:inline-flex lg:h-auto lg:w-auto lg:flex-row lg:items-center">
            <DarkModeToggle />
            <Link
              onClick={() => track("nav-click", { item: "for-venues" })}
              href="/venue"
              className="w-full items-center justify-center rounded px-3 py-2 font-bold hover:bg-blue-500/50 lg:inline-flex lg:w-auto"
            >
              venues/bookers
            </Link>
            <Link
              onClick={() => track("nav-click", { item: "map" })}
              href="/map"
              // target="_blank"
              // rel="noopener noreferrer"
              className="w-full items-center justify-center rounded px-3 py-2 font-bold hover:bg-blue-500/50 lg:inline-flex lg:w-auto"
            >
              map
            </Link>
            <Link
              onClick={() => track("nav-click", { item: "team" })}
              href="/team"
              className="w-full items-center justify-center rounded px-3 py-2 font-bold hover:bg-blue-500/50 lg:inline-flex lg:w-auto "
            >
              team
            </Link>
            <Link
              onClick={() => track("nav-click", { item: "roadmap" })}
              href="https://tappedapp.notion.site/Technical-Roadmap-4edc036572bd4d89913f5cd5a4cde0f6?pvs=4"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full items-center justify-center rounded px-3 py-2 font-bold hover:bg-blue-500/50 lg:inline-flex lg:w-auto"
            >
              roadmap
            </Link>
            <Link
              onClick={() => track("nav-click", { item: "blog" })}
              href="https://blog.tapped.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full items-center justify-center rounded px-3 py-2 font-bold hover:bg-blue-500/50 lg:inline-flex lg:w-auto"
            >
              blog
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
