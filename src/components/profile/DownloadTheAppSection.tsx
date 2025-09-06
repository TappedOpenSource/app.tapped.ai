import { AppStoreButton, GooglePlayButton } from "@/components/react-mobile-app-button";
import { Button } from "@/components/ui/button";
import { APPLE_URL, GOOGLE_URL } from "@/utils/app_download";
import { MapPinned, MicVocal, Network } from "lucide-react";
import Image from "next/image";

export default function DownloadTheAppSection({
  showIcon = true,
}: {
  showIcon?: boolean;
}) {
  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">download the tapped app for more</h2>
          <div className="flex flex-row gap-3">
            <Button variant="outline" size="icon" disabled>
              <MapPinned />
            </Button>
            <p className="flex-1">
              discover the venues in your city, with tailored recommendations synced to your booking history
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button variant="outline" size="icon" disabled>
              <MicVocal />
            </Button>
            <p className="flex-1">
              keep track of what&apos;s coming up by getting notified about new events and gig opportunities
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button variant="outline" size="icon" disabled>
              <Network />
            </Button>
            <p className="flex-1">
              we’ve made it easy to request to perform at thousands of venues across the country. no stress.
            </p>
          </div>
          <div className="flex flex-col items-center justify-start gap-4 md:flex-row">
            <GooglePlayButton url={GOOGLE_URL} theme={"dark"} />
            <AppStoreButton url={APPLE_URL} theme={"dark"} />
          </div>
        </div>
        {showIcon && (
          <div className="flex-0 hidden lg:block">
            <Image src="/images/icon_1024.png" alt="Tapped App Icon" width={124} height={124} />
          </div>
        )}
      </div>
    </>
  );
}
