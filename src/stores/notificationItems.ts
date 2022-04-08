import { atom } from "recoil";

export interface NativeValues {
  grade: string;
  accessory: string;
  characteristic1: string;
  characteristic2: string;
  engrave1: string;
  engrave2: string;
  quality: string;
}

export interface Item {
  id: number;
  grade: string;
  accessory: string;
  characteristic1: string;
  characteristic2: string;
  engrave1: string;
  engrave2: string;
  engrave1min: string;
  engrave2min: string;
  quality: string;
  maxPrice: string;
  memo: string;
  status: "create" | "save" | "edit";
  native: NativeValues;
}

export const notificationItemsState = atom<Item[]>({
  key: "notificationItems",
  default: [],
});
