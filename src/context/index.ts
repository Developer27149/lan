import React, { createContext, useContext } from "react";
import { iconSize, keywordType, openTypeStr } from "../types/index";
import { IState, IAction } from "./types";

export const initState: IState = {
  iconSize: "sm",
  wallpaperBase64:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAALCAYAAABCm8wlAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QoPAxIb88htFgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAACxSURBVBjTdY6xasJgGEXP/RvoonvAd8hDyD84+BZBEMSxL9GtQ8Fis7i6BkGI4DP4CA4dnQON3g6WNjb2wLd8nAsHWsR3D7JXt18kALFwz2dGmPVhJt0IcenUDVsgu91eCRZ9IOMfAnBvSCz8I3QYL0yV6zfyL+VUxKWfMJuOEFd+dE3pC1Finwj0HfGBeKGmblcFTIN4U2C4m+hZAaTrASSGox6YV7k+ARAp4gIIOH0BmuY1E5TjCIUAAAAASUVORK5CYII=",
  showClock: false,
  tomatoSeconds: 60,
  openType: "新页面",
  showCurClock: false,
  engine: "gg",
  imgQuality: "regular",
  wallpaperPage: 1,
  historyId: [],
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
