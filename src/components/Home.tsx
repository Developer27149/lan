import { useAppContext } from "../context/index";
import Search from "./Search";
import { useEffect, useMemo } from "react";

export default function Home() {
  const { state } = useAppContext();
  const bgImgUrl = useMemo(() => {
    console.log("执行了useMemo", typeof state.wallpaper, state.wallpaper);
    return {
      backgroundImage: `url(${state.wallpaper})`,
    };
  }, [state.wallpaper]);

  return (
    <main style={bgImgUrl} className="main">
      {!state.showClock && <Search />}
    </main>
  );
}
