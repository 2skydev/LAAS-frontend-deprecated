import { atom } from "recoil";

export const notificationLogTimeState = atom({
  key: "notificationLogTime",
  default: performance.now(),
});
