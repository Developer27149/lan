import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./style/global.sass";
import { getConfigFromStorage } from "./utils/storage.js";
getConfigFromStorage().then((config) => {
  ReactDOM.render(
    <React.StrictMode>
      <RecoilRoot>
        <App config={config} />
      </RecoilRoot>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
