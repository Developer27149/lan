import { useState } from "react";
import { getWallpaperBase64 } from "../libs";

const useUnsplash = () => {
  const [imgBase64, setImgBase64] = useState("");
  const getNewImg = () => {};
  return { imgBase64, getNewImg };
};

export { useUnsplash };
