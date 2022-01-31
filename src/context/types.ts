import { iconSize } from "../types/index";

export interface IAction {
  type: "iconSize" | "wallpaper" | "clock";
  payload: any;
}

export interface IState {
  iconSize: iconSize;
  wallpaper: string;
  showClock: boolean;
}

export type AppContext = {
  state: IState;
  action: IAction;
};
