import { iconSize } from "../types/index";

export interface IAction {
  type: "iconSize" | "wallpaper";
  payload: string & iconSize;
}

export interface IState {
  iconSize: iconSize;
  wallpaper: string;
}

export type AppContext = {
  state: IState;
  action: IAction;
};
