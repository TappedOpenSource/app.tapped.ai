import React, { FC } from "react";
import classNames from "classnames";
import Link from "next/link";

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
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        height: height,
        width: width,
        borderRadius: border,
      }}
      className={classNames("button-container", `button-container-${theme}`, className)}
    >
      <img src={logo} alt={storeName} />
      <div className="button-text-container">
        <span className="button-title">{title}</span>
        <span className="button-store-name">{storeName}</span>
      </div>
    </Link>
  );
};

export default Button;
