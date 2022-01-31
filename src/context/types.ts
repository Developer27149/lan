import { iconSize } from "../types/index";

export interface IAction {
  type: "iconSize" | "wallpaper" | "clock" | "tomato";
  payload: any;
}

export interface IState {
  iconSize: iconSize;
  wallpaper: string;
  showClock: boolean;
  tomatoSeconds: number;
}

export type AppContext = {
  state: IState;
  action: IAction;
};
