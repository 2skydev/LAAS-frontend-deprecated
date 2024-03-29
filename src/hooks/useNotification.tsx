import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import produce from "immer";
import { globalAtom } from "~/stores/global";
import { notificationSettingState } from "~/stores/notificationSetting";
import { notificationItemsState } from "~/stores/notificationItems";
import { notificationLogsState } from "~/stores/notificationLogs";
import { notification } from "antd";

const { ipcRenderer } = window.require("electron");

export default function useNotification() {
  const setting = useRecoilValue(notificationSettingState);
  const [globalState, setGlobalState] = useRecoilState(globalAtom);
  const setNotificationSetting = useSetRecoilState(notificationSettingState);
  const setNotificationItems = useSetRecoilState(notificationItemsState);
  const setNotificationLogs = useSetRecoilState(notificationLogsState);

  const init = async () => {
    setNotificationSetting(
      await ipcRenderer.invoke("getConfig", "notification")
    );
    setNotificationItems(await ipcRenderer.invoke("getItems"));
    setNotificationLogs(await ipcRenderer.invoke("getLogs"));

    ipcRenderer.on("logs", (event: any, logs: any) => {
      setNotificationLogs(logs);
    });

    ipcRenderer.on("notificationStatus", (event: any, status: any) => {
      setGlobalState(
        produce((v) => {
          v.notificationStatus = status;
        })
      );
    });

    setGlobalState(
      produce((v) => {
        v.initState = true;
      })
    );
  };

  const initBrowser = async () => {
    const status = await ipcRenderer.invoke("initBrowser");

    switch (status) {
      case "ok":
      case "existBrowser": {
        setGlobalState(
          produce((v) => {
            v.initBrowser = true;
          })
        );
        break;
      }

      case "loginFail": {
        notification.error({
          message: "로그인 실패!",
          description: (
            <>
              로스트아크 로그인에 실패하였습니다
              <br />
              알림 설정에서 아이디 비밀번호를 확인해주세요
            </>
          ),
        });
        break;
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!globalState.initState) return;

    if (!setting.lostarkID || !setting.lostarkPW || !setting.discordUserID) {
      setGlobalState(
        produce((v) => {
          v.notificationStatus = {
            id: "configNeeded",
            status: "warning",
            desc: "알림 설정에서 필수 사항을 입력해주세요 :)",
          };
        })
      );
      return;
    }

    if (globalState.initBrowser) return;

    initBrowser();
  }, [
    setting.lostarkID,
    setting.lostarkPW,
    setting.discordUserID,
    globalState.initState,
    globalState.initBrowser,
  ]);
}
