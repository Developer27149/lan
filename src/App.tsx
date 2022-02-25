import { useRecoilState } from "recoil";
import Clock from "./components/Clock";
import Home from "./components/Home";
import Menu from "./components/Menu";
import ModifyWallpaperBtn from "./components/ModifyWallpaperBtn";
import { storageDataType } from "./types/index";
import { useEffect, useState } from "react";
import { configState } from "./recoilRoot";
import { getConfigFromStorage, saveConfigToStorage } from "./utils/storage";
import BookmarkContainer from "./components/BookmarkContainer";
import { updateRootStateWithKeyAndValue } from "./utils/index.js";

export default function App(props: { config: storageDataType }) {
  const { config } = props;
  const [state, setConfig] = useRecoilState(configState);

  const [isRender, setIsRender] = useState(false);
  useEffect(() => {
    // init config reciol state
    setConfig(config);
    updateRootStateWithKeyAndValue(setConfig, "showAddIconBox", false);
    setIsRender(true);
    // init debug api
    // globalThis.conf = () => {
    //   getConfigFromStorage().then((res) => {
    //     console.log(res.publicObject);
    //   });
    // };
  }, []);
  useEffect(() => {
    if (state?.publicObject) {
      saveConfigToStorage(state);
    }
  }, [state]);
  if (!isRender) return null;
  return (
    <>
      <Home />
      {state?.publicObject?.showClock === false ? (
        <>
          <ModifyWallpaperBtn />
          <Menu />
          <Clock />
          <BookmarkContainer />
        </>
      ) : null}
    </>
  );
}
