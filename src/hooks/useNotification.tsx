import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { globalAtom } from "~/stores/global";
import { notificationLogTimeState } from "~/stores/notificationLogs";
import { notificationSettingState } from "~/stores/notificationSetting";

const { ipcRenderer } = window.require("electron");

let handle: any;

export default function useNotification() {
  const setting = useRecoilValue(notificationSettingState);
  const [globalState, setGlobalState] = useRecoilState(globalAtom);
  const [, setNotificationLogTime] = useRecoilState(notificationLogTimeState);

  const request = useCallback((setting) => {
    const items = JSON.parse(
      window.localStorage.getItem("notification") || "[]"
    ) as any[];

    if (!items.length) {
      return;
    }

    ipcRenderer.send("notification", {
      items: items.map((item) => ({
        ...item.native,
        memo: item.memo,
        engrave1min: item.engrave1min,
        engrave2min: item.engrave2min,
        maxPrice: item.maxPrice,
        _origin: item,
      })),
      setting,
    });
  }, []);

  useEffect(() => {
    if (!setting.lostarkID || !setting.lostarkPW || globalState.initBrowser) {
      return;
    }

    ipcRenderer.send("initBrowser", {
      setting,
    });
  }, [setting.lostarkID, setting.lostarkPW, globalState.initBrowser]);

  useEffect(() => {
    ipcRenderer.on("notification-logs", (event: any, logs: any) => {
      window.notificationLogs.push(...logs);
      setNotificationLogTime(performance.now());
    });

    ipcRenderer.on("initBrowser-success", () => {
      setGlobalState({
        ...globalState,
        initBrowser: true,
      });
    });
  }, []);

  useEffect(() => {
    if (!setting.discordUserID || !globalState.initBrowser) {
      return;
    }

    request(setting);

    handle = setInterval(() => request(setting), 1000 * 60 * setting.interval);

    return () => {
      clearInterval(handle);
    };
  }, [setting.discordUserID, setting.interval, globalState.initBrowser]);
}
