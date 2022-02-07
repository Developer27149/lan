import React, { createContext, useContext } from "react";
import { iconSize, keywordType, openTypeStr } from "../types/index";
import { IState, IAction } from "./types";

export const initState = {
  iconSize: "sm" as iconSize,
  wallpaper: "",
  showClock: false,
  tomatoSeconds: 60,
  openType: "新页面" as openTypeStr,
  showCurClock: false,
  engine: "gg" as keywordType,
};

export const AppContext = createContext<{
  state: IState;
  dispatch: React.Dispatch<IAction>;
}>({
  state: initState,
  dispatch: () => null,
});

export const AppContextProvider = AppContext.Provider;
export const useAppContext = () => useContext(AppContext);
