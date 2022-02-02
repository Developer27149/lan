import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { getObjFromStorage } from "./utils/index";
import "./style/global.sass";
import { iconSize } from "./types/index";

const promiseArr = [
  getObjFromStorage("wallpaper"),
  getObjFromStorage("icon_size"),
  getObjFromStorage("tomato_seconds"),
  getObjFromStorage("open_type"),
];
Promise.all(promiseArr).then((props: any[]) => {
  const [wallpaper, icon_size, tomato_seconds, open_type] = props;

  ReactDOM.render(
    <React.StrictMode>
      <App
        wallpaper={wallpaper.wallpaper}
        icon_size={icon_size.icon_size as iconSize}
        tomatoSeconds={tomato_seconds.tomato_seconds}
        openType={open_type.open_type}
      />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
