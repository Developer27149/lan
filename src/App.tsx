import { useReducer } from "react";
import Home from "./components/Home";
import Menu from "./components/Menu";
import ModifyWallpaperBtn from "./components/ModifyWallpaperBtn";
import { AppContextProvider } from "./context/index";
import { appReducer } from "./context/reducer";
import { iconSize, openTypeStr } from "./types/index";
interface IProps {
  wallpaper: string;
  icon_size: iconSize;
  tomatoSeconds: number;
  openType: openTypeStr;
}

export default function App(props: IProps) {
  const { wallpaper, icon_size, tomatoSeconds, openType } = props;
  const [state, dispatch] = useReducer(appReducer, {
    wallpaper,
    openType,
    tomatoSeconds,
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
    </AppContextProvider>
  );
}
