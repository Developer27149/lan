import React, { useState } from "react";
import img from "../../public/icons/64.svg";

export default function ModifyWallpaperBtn() {
  const [animate, setAnimate] = useState(false);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 2010);
  };
  return (
    <button
      className="update"
      onClick={handleClick}
      style={
        animate
          ? {
              // animation: "rotateImg 2s infinite linear",
              // animationIterationCount: "infinite",
            }
          : undefined
      }
    >
      <img src={img} />
    </button>
  );
}
