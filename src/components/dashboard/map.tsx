"use client";

import { motion } from "framer-motion";

import { Button } from "../ui/button";
import Link from "next/link";

export default function DashboardMap() {
  return (
    <>
      <div className="relative">
        <div className="absolute z-10 flex h-full w-full items-center justify-center">
          <Link href="/map">
            <Button variant={"secondary"}>view map</Button>
          </Link>
        </div>
        <div className="relative z-0 flex h-screen w-full flex-row items-center justify-center bg-white py-20 md:h-auto dark:bg-black">
          <div className="relative mx-auto h-full w-full max-w-7xl overflow-hidden px-4 md:h-[40rem]">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
              }}
              className="div"
            >
              <h2 className="text-center text-xl font-bold text-black md:text-4xl dark:text-white">
                create a world tour from your iPhone
              </h2>
              <p className="mx-auto mt-2 max-w-md text-center text-base font-normal text-neutral-700 md:text-lg dark:text-neutral-200">
                decide your next show using facts and analytics to make every
                show a success
              </p>
            </motion.div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-40 w-full select-none bg-gradient-to-b from-transparent to-white dark:to-black" />
          </div>
        </div>
      </div>
    </>
  );
}
