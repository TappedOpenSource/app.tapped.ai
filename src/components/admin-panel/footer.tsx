import { Github, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 bg-background/95 z-20 w-full shadow backdrop-blur">
      <div className="mx-4 flex h-14 items-center justify-between md:mx-8">
        <p className="text-muted-foreground text-left text-xs leading-loose md:text-sm">
          © {new Date().getFullYear()}.{" "}
          <Link
            href="https://tapped.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Tapped Industries Inc.™
          </Link>
          . All Rights Reserved. - Made with 💙 in Richmond, Virginia
        </p>
        <div className="mt-4 flex space-x-5 sm:justify-center md:mt-0 rtl:space-x-reverse">
          {/* <Link href="/" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                  <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                </svg>
                <span className="sr-only">Facebook page</span>
              </Link> */}
          {/* <Link href="/" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
                </svg>
                <span className="sr-only">Discord community</span>
              </Link> */}
          <Link href="https://x.com/tappedx" className="text-gray-400 hover:text-white">
            <Twitter className="h-4 w-4" />
          </Link>
          <Link href="https://github.com/TappedOpenSource" className="text-gray-400 hover:text-white">
            <Github className="h-4 w-4" />
          </Link>
          {/* <Link
            href="https://tiktok.com/@tappedx"
            className="text-gray-400 hover:text-white"
          >
            <TikTok
          </Link> */}
          <Link href="https://instagram.com/tappedx" className="text-gray-400 hover:text-white">
            <Instagram className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
