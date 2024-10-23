import React, { FC } from "react";
import classNames from "classnames";
import Image from "next/image";
import { Outfit } from "next/font/google";
import { trackEvent } from "@/utils/tracking";

type ButtonProps = {
  theme?: "dark" | "light";
  height?: number;
  width?: number;
  logo: string;
  storeName: string;
  title: string;
  url: string;
  className?: string;
  border?: number;
};

const outfit = Outfit({
  subsets: ["latin"],
});

const Button: FC<ButtonProps> = ({
  theme = "light",
  height = 60,
  width = 200,
  border,
  logo,
  storeName,
  title,
  url,
  className,
}) => {
  return (
    <div>
      <button
        onClick={() => {
          if (url) {
            window.open(url, "_blank");
          }

          trackEvent("appstore_button_clicked", {
            storeName,
            url,
          });
        }}
        style={{
          height: height,
          width: width,
          borderRadius: border,
        }}
        className={classNames("button-container", `button-container-${theme}`, className)}
      >
        <Image
          src={logo}
          alt={storeName}
          height={36}
          width={36}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
        <div className={outfit.className + " flex flex-col items-start"}>
          <span className="button-title">{title}</span>
          <span className="button-store-name">{storeName}</span>
        </div>
      </button>
    </div>
  );
};

export default Button;
