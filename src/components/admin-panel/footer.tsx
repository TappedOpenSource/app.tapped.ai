import Link from "next/link";

export function Footer() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 z-20 w-full shadow bg-background/95 backdrop-blur">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
        © {new Date().getFullYear()}.{" "}
          <Link
            href="https://tapped.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >Tapped Industries Inc.™</Link>.
            All Rights Reserved. - Made with 💙 in Richmond, Virginia
        </p>
      </div>
    </div>
  );
}
