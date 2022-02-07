import { iconSize, keywordType, openTypeStr } from "../types/index";

export interface IAction {
  type: "iconSize" | "wallpaper" | "clock" | "tomato" | "openType" | "curClock" | "engine";
  payload: any;
}

export interface IState {
  iconSize: iconSize;
  wallpaper: string;
  showClock: boolean;
  tomatoSeconds: number;
  openType: openTypeStr;
  showCurClock: boolean;
  engine: keywordType;
}

export type AppContext = {
  state: IState;
  action: IAction;
};
