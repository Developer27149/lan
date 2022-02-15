import { useReducer } from "react";
import Clock from "./components/Clock";
import Home from "./components/Home";
import Menu from "./components/Menu";
import ModifyWallpaperBtn from "./components/ModifyWallpaperBtn";
import { AppContextProvider } from "./context/index";
import { appReducer } from "./context/reducer";
import { storageDataType } from "./types/index";

export default function App(props: storageDataType) {
  const [state, dispatch] = useReducer(appReducer, {
    ...props,
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
