import { useReducer } from "react";
import Home from "./components/Home";
import Menu from "./components/Menu";
import ModifyWallpaperBtn from "./components/ModifyWallpaperBtn";
import { AppContextProvider } from "./context/index";
import { appReducer } from "./context/reducer";
import { iconSize } from "./types/index";
interface IProps {
  wallpaper: string;
  icon_size: iconSize;
  tomatoSeconds: number;
}

export default function App(props: IProps) {
  const { wallpaper, icon_size, tomatoSeconds } = props;
  const [state, dispatch] = useReducer(appReducer, {
    wallpaper,
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
