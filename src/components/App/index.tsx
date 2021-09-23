import "antd/dist/antd.css";
import "./index.scss";

import { AppStyled, GlobalStyled } from "./styled";

import Sidebar from "../Sidebar";
import Content from "../Content";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "~/assets/ts/theme";
import { useLocalStorage } from "react-use";
import { BrowserRouter, useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { themeState } from "~/stores/theme";
import { useEffect } from "react";
import useNotification from "~/hooks/useNotification";
import { notificationSettingState } from "~/stores/notificationSetting";

const { ipcRenderer } = window.require("electron");

type Theme = typeof lightTheme;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

declare global {
  interface Window {
    electron: boolean;
    require: any;
    initBrowser: boolean;
    notificationLogs: any[];
  }
}

window.notificationLogs = [];

function AppInner() {
  const history = useHistory();

  const appControl = (action: string) => {
    ipcRenderer.send("appControl", action);
  };

  useEffect(() => {
    history.replace("/");
  }, []);

  return (
    <AppStyled className="app">
      <div className="titleBar">
        <div onClick={() => appControl("minimize")}>
          <i className="bx bx-minus" />
        </div>

        <div onClick={() => appControl("maximize")}>
          <i className="bx bx-square" />
        </div>

        <div className="close" onClick={() => appControl("close")}>
          <i className="bx bx-x" />
        </div>
      </div>

      <div className="main">
        <Sidebar />
        <Content />
      </div>
    </AppStyled>
  );
}

export default function App() {
  const [themeModeLS] = useLocalStorage("theme", "dark");
  const [notificationSettingLS] = useLocalStorage("setting-notification");
  const [themeMode, setThemeMode] = useRecoilState(themeState);
  const setNotificationSetting = useSetRecoilState(notificationSettingState);

  useNotification();

  useEffect(() => {
    if (notificationSettingLS) {
      setNotificationSetting(notificationSettingLS as any);
    }

    setThemeMode(themeModeLS as string);
  }, []);

  return (
    <ThemeProvider
      theme={
        (themeMode ? themeMode : themeModeLS) === "light"
          ? lightTheme
          : darkTheme
      }
    >
      <GlobalStyled />
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </ThemeProvider>
  );
}
