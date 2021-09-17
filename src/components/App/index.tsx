import "antd/dist/antd.css";
import "./index.scss";

import { AppStyled, GlobalStyled } from "./styled";

import Sidebar from "../Sidebar";
import Content from "../Content";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "~/assets/ts/theme";
import { useLocalStorage } from "react-use";
import { BrowserRouter } from "react-router-dom";
import { useRecoilState } from "recoil";
import { themeState } from "~/stores/theme";
import { useEffect } from "react";

type Theme = typeof lightTheme;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

export default function App() {
  const [themeModeLS] = useLocalStorage("theme", "dark");
  const [themeMode, setThemeMode] = useRecoilState(themeState);

  useEffect(() => {
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
