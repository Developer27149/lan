import { useRecoilState } from "recoil";
import Clock from "./components/Clock";
import Home from "./components/Home";
import Menu from "./components/Menu";
import ModifyWallpaperBtn from "./components/ModifyWallpaperBtn";
import { storageDataType } from "./types/index";
import { useEffect, useState } from "react";
import { configState } from "./recoilRoot";
import { saveConfigFromStorage } from "./utils/storage";

export default function App(props: { config: storageDataType }) {
  const { config } = props;
  const [state, setConfig] = useRecoilState(configState);
  const [isRender, setIsRender] = useState(false);
  useEffect(() => {
    console.log("init config");
    setConfig(config);
    setTimeout(() => {
      setIsRender(true);
    }, 100);
  }, []);
  useEffect(() => {
    if (state?.publicObject) {
      saveConfigFromStorage(state);
    }
  }, [state]);
  if (!isRender) return null;
  return (
    <>
      <Home />
      <ModifyWallpaperBtn />
      <Menu />
      <Clock />
    </>
  );
}
