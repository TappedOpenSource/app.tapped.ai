import React from "react";
import Link from "next/link";
import Image from "next/image";

const Model = () => {
  return (
    <div className="grid h-full grid-cols-1 gap-2 rounded-lg bg-[#FFF] p-8 shadow-lg">
      <div className="grid grid-rows-6 gap-2">
        <div className="pb-8">
          <p className="max-h-10 text-4xl font-bold text-[#42A5F5]">
            MODEL NAME
          </p>
          <div className="flex h-full items-center justify-center text-center font-bold">
            <p>Credits Left: 100</p>
          </div>
        </div>
        <div>
          <p className="max-h-10 text-2xl font-bold text-[#A0A0A0]">Avatars</p>
          <button className="tapped_signup_btn">Download</button>
        </div>
        <div>
          <p className="max-h-10 text-2xl font-bold text-[#A0A0A0]">
            Stage Photos
          </p>
          <button className="tapped_signup_btn">Download</button>
        </div>
        <div>
          <p className="max-h-10 text-2xl font-bold text-[#A0A0A0]">
            Marketing Plan
          </p>
          <p className="py-4">
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
            Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
            Lorem Ipsum
          </p>
        </div>
        <div>
          <p className="max-h-10 text-2xl font-bold text-[#A0A0A0]">
            Branding Guidelines
          </p>
          <p className="py-4">
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
            Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
            Lorem Ipsum
          </p>
        </div>
        <div className="pt-24">
          <div>
            <Link href="/branding">
              <button className="tapped_btn max-h-10 w-full">
                Return Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
