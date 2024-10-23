import React, { FC } from "react";
import Button from "../Button";

type AppStoreButtonProps = {
  theme?: "dark" | "light";
  height?: number;
  width?: number;
  className?: string;
  url: string;
};

const AppStoreButton: FC<AppStoreButtonProps> = ({ theme = "light", height, width, className, url }) => {
  return (
    <Button
      theme={theme}
      height={height}
      width={width}
      url={url}
      storeName={"App Store"}
      logo={theme === "dark" ? "/icons/Apple-light.svg" : "/icons/Apple.svg"}
      className={className}
      title={"Download on the"}
    />
  );
};

export default AppStoreButton;
