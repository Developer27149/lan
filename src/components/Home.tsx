import Search from "./Search";
import { useMemo } from "react";
import TomatoTime from "./TomatoTime";
import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";

export default function Home() {
  const [config] = useRecoilState(configState);
  const {
    publicObject: { wallpaperBase64 },
  } = config;
  const bgImgUrl = useMemo(() => {
    return {
      backgroundImage:
        wallpaperBase64.length === 0
          ? "linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4);"
          : `url(${config.publicObject.wallpaperBase64})`,
    };
  }, [wallpaperBase64]);

  return (
    <main style={bgImgUrl} className="main">
      {config.publicObject.showClock ? <TomatoTime /> : <Search />}
    </main>
  );
}
