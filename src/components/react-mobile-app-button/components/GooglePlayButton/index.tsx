import React, { FC } from "react";

import Button from "../Button";

type GooglePlayButtonProps = {
  theme?: "dark" | "light";
  height?: number;
  width?: number;
  className?: string;
  url: string;
};

const GooglePlayButton: FC<GooglePlayButtonProps> = ({ theme = "light", height, width, className, url }) => {
  return (
    <Button
      theme={theme}
      height={height}
      width={width}
      url={url}
      storeName={"Google Play"}
      logo={"/icons/Google-Play.svg"}
      className={className}
      title={"GET IT ON"}
    />
  );
};

export default GooglePlayButton;
