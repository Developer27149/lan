import React, { useState } from "react";
import { requestNewestWallpaper } from "../utils/unsplash";

export default function ModifyWallpaperBtn() {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 2010);
    const result = await requestNewestWallpaper();
    if (result !== true) {
      console.log(result);
    } else {
      console.log(result);

      // location.reload();
    }
    setIsLoading(false);
  };
  return (
    <button
      className="update"
      onClick={handleClick}
      data-loading={isLoading.toString()}
    >
      <img src="icons/64.svg" />
    </button>
  );
}
