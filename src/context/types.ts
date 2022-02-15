import { iconSize, keywordType, openTypeStr, storageDataType } from "../types/index";

export interface IAction {
  type: "iconSize" | "wallpaper" | "clock" | "tomato" | "openType" | "curClock" | "engine";
  payload: any;
}

export interface IState extends storageDataType {
  showClock: boolean;
}

export type AppContext = {
  state: IState;
  action: IAction;
};
