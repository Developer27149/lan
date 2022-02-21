import { atom } from "recoil";
import { storageDataType } from "./types/index.js";

export const configState = atom({ key: "config", default: {} as storageDataType });
