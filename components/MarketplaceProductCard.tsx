import { Icon } from "@mui/material";
import Link from "next/link";

const MarketplaceProductCard = () => {
  const features: string[] = [
    "access to the tapped booking platform",
    "community of music professionals",
    "exclusive access to tapped events",
    "exclusive access to promoters in our network",
  ];

  return (
    <div className="flex justify-center rounded-lg bg-[#2d2d2d] shadow">
      <div>
        <div>
          <p className="px-4 pt-4 text-left text-lg font-bold text-[#42A5F5]">
            LIVE PERFORMANCE BOOKINGS
          </p>
        </div>
        {/* <p className="px-4 pt-2 text-white">{product?.description ?? ''}</p> */}
        <div className="p-4 flex flex-col gap-4">
          {features.map((feature, index) => {
            return (
              <div key={index} className='flex flex-row'>
                <Icon className='text-[#42A5F5]'>check_circle</Icon>
                <div className='pr-4'></div>
                <p>{feature}</p>
              </div>
            );
          })}
        </div>
        <p className="px-4 pt-8 text-3xl font-bold text-white">FREE</p>
        <div className="px-5 pt-4">
          <Link
            href="https://tapped.ai/download"
            className="block flex justify-center focus:shadow-outline-blue w-full rounded-sm bg-[#42A5F5] px-4 py-2 my-6 text-white hover:bg-gray-700 focus:border-gray-700 focus:outline-none active:bg-gray-800"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceProductCard;
