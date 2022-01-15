import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ModifyWallpaperBtn from "./components/ModifyWallpaperBtn";
import "./style/global.sass";

chrome.storage.local.get("wallpaper").then(({ wallpaper }: any) => {
  ReactDOM.render(
    <React.StrictMode>
      <App wallpaper={wallpaper} />
      <ModifyWallpaperBtn />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
