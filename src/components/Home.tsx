import Search from "./Search";
import { useMemo } from "react";
import TomatoTime from "./TomatoTime";
import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";

export default function Home() {
  const [config] = useRecoilState(configState);
  const bgImgUrl = useMemo(() => {
    return {
      backgroundImage: `url(${config.publicObject.wallpaperBase64})`,
    };
  }, [config.publicObject.wallpaperBase64]);

  return (
    <main style={bgImgUrl} className="main">
      {config.publicObject.showClock ? <TomatoTime /> : <Search />}
    </main>
  );
}
