import { useEffect } from "react";
import { BrowserRouter, useHistory } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Sidebar from "../Sidebar";
import Content from "../Content";
import useNotification from "~/hooks/useNotification";
import { lightTheme, darkTheme } from "~/assets/ts/theme";

import { AppStyled, GlobalStyled } from "./styled";

import "antd/dist/antd.css";
import "./index.scss";
import { useLocalStorage } from "react-use";
import { useRecoilState, useSetRecoilState } from "recoil";
import { themeState } from "~/stores/theme";
import { globalAtom } from "~/stores/global";
import produce from "immer";

// electron import
const { ipcRenderer } = window.require("electron");

// get theme type
type Theme = typeof darkTheme;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

declare global {
  interface Window {
    require: any;
    initBrowser: boolean;
    notificationLogs: any[];
  }
}

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
  useNotification();

  const [themeModeLS] = useLocalStorage("theme", "dark");
  const [themeMode, setThemeMode] = useRecoilState(themeState);
  const setGlobalStore = useSetRecoilState(globalAtom);

  const getVersion = async () => {
    const version = await ipcRenderer.invoke("getVersion");
    
    setGlobalStore(produce((draft) => {
      draft.version = version;
    }));
  }

  useEffect(() => {
    getVersion();
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
