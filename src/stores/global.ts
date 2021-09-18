import { atom } from "recoil";

export const globalAtom = atom({
  key: "global",
  default: {
    initBrowser: false,
  },
});
