import React from "react";
import ModelCard from "../components/modelCard";
import Link from "next/link";

const branding = () => {
  return (
    <div className="grid h-screen grid-cols-1 gap-2 rounded-lg bg-[#FFF] p-8 shadow-lg">
      <div>
        <div className="pb-8">
          <p className="max-h-10 text-4xl font-bold text-[#42A5F5]">BRANDING</p>
        </div>
        <div className="pb-10">
          <Link href="/new_model">
            <button className="tapped_btn max-h-10 w-full">
              Create New Model
            </button>
          </Link>
        </div>
        <Link href="/model">
          <ModelCard modelName={"Model Name 1"} />
        </Link>
        <br></br>
        <Link href="/model">
          <ModelCard modelName={"Model Name 2"} />
        </Link>
        <br></br>
        <Link href="/model">
          <ModelCard modelName={"Model Name 3"} />
        </Link>
      </div>
    </div>
  );
};

export default branding;
