import "antd/dist/antd.css";
import "./index.scss";

import { AppStyled, GlobalStyled } from "./styled";

import Sidebar from "../Sidebar";
import Content from "../Content";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "~/assets/ts/theme";
import { useLocalStorage } from "react-use";
import { BrowserRouter } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { themeState } from "~/stores/theme";
import { useEffect } from "react";
import useNotification from "~/hooks/useNotification";
import { notificationSettingState } from "~/stores/notificationSetting";

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
        <AppStyled className="app">
          <Sidebar />
          <Content />
        </AppStyled>
      </BrowserRouter>
    </ThemeProvider>
  );
}
