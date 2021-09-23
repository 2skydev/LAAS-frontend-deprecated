import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import produce from "immer";
import { globalAtom } from "~/stores/global";
import { notificationSettingState } from "~/stores/notificationSetting";
import { notificationItemsState } from "~/stores/notificationItems";
import { notificationLogsState } from "~/stores/notificationLogs";

const { ipcRenderer } = window.require("electron");

export default function useNotification() {
  const setting = useRecoilValue(notificationSettingState);
  const [globalState, setGlobalState] = useRecoilState(globalAtom);
  const setNotificationSetting = useSetRecoilState(notificationSettingState);
  const setNotificationItems = useSetRecoilState(notificationItemsState);
  const setNotificationLogs = useSetRecoilState(notificationLogsState);

  const init = useCallback(async () => {
    setNotificationSetting(
      await ipcRenderer.invoke("getConfig", "notification")
    );
    setNotificationItems(await ipcRenderer.invoke("getItems"));
    setNotificationLogs(await ipcRenderer.invoke("getLogs"));

    ipcRenderer.on("logs", (event: any, logs: any) => {
      setNotificationLogs(logs);
    });
  }, []);

  const initBrowser = useCallback(async () => {
    const result = await ipcRenderer.invoke("initBrowser");

    if (result) {
      setGlobalState(
        produce((v) => {
          v.initBrowser = true;
        })
      );
    }
  }, []);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (
      !setting.lostarkID ||
      !setting.lostarkPW ||
      !setting.discordUserID ||
      globalState.initBrowser
    ) {
      return;
    }

    initBrowser();
  }, [
    setting.lostarkID,
    setting.lostarkPW,
    setting.discordUserID,
    globalState.initBrowser,
  ]);
}
