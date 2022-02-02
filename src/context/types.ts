import { iconSize, openTypeStr } from "../types/index";

export interface IAction {
  type: "iconSize" | "wallpaper" | "clock" | "tomato" | "openType";
  payload: any;
}

export interface IState {
  iconSize: iconSize;
  wallpaper: string;
  showClock: boolean;
  tomatoSeconds: number;
  openType: openTypeStr;
}

export type AppContext = {
  state: IState;
  action: IAction;
};
