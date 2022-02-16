import { storageDataType } from "../types/index";

export interface IAction {
  type: "history" | "public" | "clock";
  payload: any;
}

export interface IState extends storageDataType {
  showClock: boolean;
}

export type AppContext = {
  state: IState;
  action: IAction;
};
