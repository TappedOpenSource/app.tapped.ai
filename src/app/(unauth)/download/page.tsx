import Footer from "@/components/Footer";
import DownloadTheAppSection from "@/components/profile/DownloadTheAppSection";
import Image from "next/image";

export default function Download() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="py-24 px-4">
          <div className="flex-0 hidden lg:block py-4">
            <Image src="/images/icon_1024.png" alt="Tapped App Icon" width={124} height={124} />
          </div>
          <DownloadTheAppSection showIcon={false} />
        </div>
      </div>
      <Footer />
    </>
  );
}
