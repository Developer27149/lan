import { useRecoilState } from "recoil";
import Clock from "./components/Clock";
import Home from "./components/Home";
import Menu from "./components/Menu";
import ModifyWallpaperBtn from "./components/ModifyWallpaperBtn";
import { storageDataType } from "./types/index";
import { useEffect } from "react";
import { configState } from "./recoilRoot";

export default function App(props: { config: storageDataType }) {
  const { config } = props;
  const [_, setConfig] = useRecoilState(configState);
  console.log("render app component");
  useEffect(() => {
    setConfig(config);
  }, []);

  return (
    <>
      <Home />
      <ModifyWallpaperBtn />
      <Menu />
      <Clock />
    </>
  );
}
