import { useReducer } from "react";
import Clock from "./components/Clock";
import Home from "./components/Home";
import Menu from "./components/Menu";
import ModifyWallpaperBtn from "./components/ModifyWallpaperBtn";
import { AppContextProvider } from "./context/index";
import { appReducer } from "./context/reducer";
import { iconSize, keywordType, openTypeStr } from "./types/index";
interface IProps {
  wallpaper: string;
  icon_size: iconSize;
  tomatoSeconds: number;
  openType: openTypeStr;
  showCurClock: boolean;
  engine: keywordType;
}

export default function App(props: IProps) {
  const { wallpaper, icon_size, tomatoSeconds, openType, showCurClock, engine } = props;

  const [state, dispatch] = useReducer(appReducer, {
    wallpaper,
    openType,
    showCurClock,
    tomatoSeconds,
    engine,
    iconSize: icon_size,
    showClock: false,
  });
  return (
    <AppContextProvider value={{ state, dispatch }}>
      <Home />
      {!state.showClock && (
        <>
          <ModifyWallpaperBtn />
          <Menu />
        </>
      )}
      {!state.showCurClock && <Clock size={state.iconSize} />}
    </AppContextProvider>
  );
}
