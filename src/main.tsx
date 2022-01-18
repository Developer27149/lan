import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { getObjFromStorage } from "./utils/index";
import "./style/global.sass";
import { iconSize } from "./types/index";

const promiseArr = [
  getObjFromStorage("wallpaper"),
  getObjFromStorage("icon_size"),
];
Promise.all(promiseArr).then((props: any[]) => {
  const [wallpaper, icon_size] = props;
  ReactDOM.render(
    <React.StrictMode>
      <App
        wallpaper={wallpaper.wallpaper}
        icon_size={icon_size.icon_size as iconSize}
      />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
