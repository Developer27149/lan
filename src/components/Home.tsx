import { useAppContext } from "../context/index";
import Search from "./Search";
import { useMemo } from "react";
import TomatoTime from "./TomatoTime";

export default function Home() {
  const { state } = useAppContext();
  console.log(state);

  const bgImgUrl = useMemo(() => {
    return {
      backgroundImage: `url(${state.wallpaper})`,
    };
  }, [state.wallpaper]);

  return (
    <main style={bgImgUrl} className="main">
      {state.showClock ? <TomatoTime /> : <Search />}
    </main>
  );
}
