import Link from "next/link";
import React, { useState } from "react";

const CreatingModel = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="grid h-screen grid-cols-1 gap-2 rounded-lg bg-[#FFF] p-8 shadow-lg">
      <div className="grid grid-rows-3 gap-2">
        <div className="pb-8">
          <p className="max-h-10 text-4xl font-bold text-[#42A5F5]">
            CREATING MODEL
          </p>
        </div>
        <div className="text-center text-[#42A5F5]">
          <p>Model is being generated!</p>
          <p>***insert loading icon once generator installed***</p>
          {/* start generator setLoading(true) and wait for generator to return
             once generator returns setLoading(false) and end loading icon*/}
        </div>
        <div className="pt-44">
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

export default CreatingModel;
