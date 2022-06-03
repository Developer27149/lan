import { useRecoilState } from "recoil";
import Clock from "./components/Clock";
import Home from "./components/Home";
import Menu from "./components/Menu";
import ModifyWallpaperBtn from "./components/ModifyWallpaperBtn";
import { storageDataType } from "./types/index";
import { useEffect, useState } from "react";
import { configState } from "./recoilRoot";
import { saveConfigToStorage } from "./utils/storage";
import BookmarkContainer from "./components/BookmarkContainer";
import { updateRootStateWithKeyAndValue } from "./utils/index.js";
import TodoList from "./components/TodoList";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";

export default function App(props: { config: storageDataType }) {
  const { config } = props;
  const [state, setConfig] = useRecoilState(configState);

  const [isRender, setIsRender] = useState(false);
  useEffect(() => {
    // init config reciol state
    setConfig(config);
    updateRootStateWithKeyAndValue(setConfig, "showAddIconBox", false);
    setIsRender(true);
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }, []);
  useEffect(() => {
    if (state?.publicObject) {
      saveConfigToStorage(state);
    }
  }, [state]);
  // useEffect(() => {
  //   document.addEventListener("keydown", (e) => {
  //     console.log(e, e.altKey, " from app component");

  //     // if ((e.metaKey || e.altKey) && e.key === ".") {
  //     //   setBingState((oldState) => ({ ...oldState, show: !oldState.show }));
  //     // }
  //   });
  // }, []);
  if (!isRender) return null;
  return (
    <ConfigProvider locale={zhCN}>
      <Home />
      {state?.publicObject?.showClock === false ? (
        <>
          <ModifyWallpaperBtn />
          <Menu />
          <Clock />
          <BookmarkContainer />
          <TodoList />
        </>
      ) : null}
    </ConfigProvider>
  );
}
