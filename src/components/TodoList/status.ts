import { atom } from "recoil";
import { ETabs, ITodoItem } from "./const.js";

export const todoListState = atom({
  key: "todoList",
  default: [] as ITodoItem[],
});

export const todoPath = atom({
  key: "todoPath",
  default: ETabs.今日,
});
