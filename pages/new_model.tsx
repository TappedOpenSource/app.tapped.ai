import Link from "next/link";
import React, { useState } from "react";

const New_Model = () => {
  const [data, setData] = useState({
    artistName: "",
    genres: "",
    socialFollowing: "",
    postFreq: "",
    sellingPoint: "",
    theme: "",
    planLength: "",
  });

  const handleLogin = () => {
    console.log("hi");
  };

  return (
    <div className="grid h-full grid-cols-1 gap-2 rounded-lg bg-[#FFF] p-8 shadow-lg">
      <div>
        <div className="pb-8">
          <p className="max-h-10 text-4xl font-bold text-[#42A5F5]">
            NEW MODEL
          </p>
        </div>

        <form className="w-full max-w-sm" onSubmit={handleLogin}>
          <div className="mb-6 md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
                htmlFor="inline-artistName"
              >
                What is your artist name?
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="inline-artistName"
                type="text"
                placeholder=""
                onChange={(e: any) =>
                  setData({
                    ...data,
                    artistName: e.target.value,
                  })
                }
                value={data.artistName || ""}
              ></input>
            </div>
          </div>

          <div className="mb-6 md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
                htmlFor="inline-artistName"
              >
                What 3 genres would you use to describe your music?
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="inline-genres"
                type="text"
                placeholder=""
                onChange={(e: any) =>
                  setData({
                    ...data,
                    genres: e.target.value,
                  })
                }
                value={data.genres || ""}
              ></input>
            </div>
          </div>

          <div className="mb-6 md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
                htmlFor="inline-socialFollowing"
              >
                How big is your following on all social media platforms
                combined?
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="inline-socialFollowing"
                type="text"
                placeholder=""
                onChange={(e: any) =>
                  setData({
                    ...data,
                    socialFollowing: e.target.value,
                  })
                }
                value={data.socialFollowing || ""}
              ></input>
            </div>
          </div>

          <div className="mb-6 md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
                htmlFor="inline-sellingPoint"
              >
                What is your main selling point as a creative?
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="inline-sellingPoint"
                type="text"
                placeholder=""
                onChange={(e: any) =>
                  setData({
                    ...data,
                    sellingPoint: e.target.value,
                  })
                }
                value={data.sellingPoint || ""}
              ></input>
            </div>
          </div>

          <div className="mb-6 md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
                htmlFor="inline-theme"
              >
                What should the theme for your image content be?
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="inline-theme"
                type="text"
                placeholder=""
                onChange={(e: any) =>
                  setData({
                    ...data,
                    theme: e.target.value,
                  })
                }
                value={data.theme || ""}
              ></input>
            </div>
          </div>

          <div className="mb-6 md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
                htmlFor="inline-planLength"
              >
                How long do you want this plan to be in effect for?
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="inline-planLength"
                type="text"
                placeholder=""
                onChange={(e: any) =>
                  setData({
                    ...data,
                    planLength: e.target.value,
                  })
                }
                value={data.planLength || ""}
              ></input>
            </div>
          </div>

          <div className="mb-6 md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
                htmlFor="inline-postFreq"
              >
                How often do you want to post on socials?
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="inline-postFreq"
                type="text"
                placeholder=""
                onChange={(e: any) =>
                  setData({
                    ...data,
                    postFreq: e.target.value,
                  })
                }
                value={data.postFreq || ""}
              ></input>
            </div>
          </div>

          <div className="mb-6 md:flex md:items-center">
            <div className="md:w-1/3">
              <label className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right">
                Model Image Source
              </label>
            </div>
            <div className="md:w-2/3">
              <button className="tapped_btn" type="button">
                Upload Images
              </button>
            </div>
          </div>

          <div className="pt-10">
            <Link href="/creating_model">
              <button className="tapped_btn max-h-10 w-full" type="submit">
                Create New Model
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default New_Model;
