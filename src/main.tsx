import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style/global.sass";
import { getConfigFromStorage } from "./utils/storage.js";

getConfigFromStorage().then((config) => {
  ReactDOM.render(
    <React.StrictMode>
      <App {...config} />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
