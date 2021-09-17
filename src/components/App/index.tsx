import "antd/dist/antd.css";
import "./index.scss";

import { AppStyled } from "./styled";

import Sidebar from "../Sidebar";
import Content from "../Content";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "~/assets/ts/theme";
import { useLocalStorage } from "react-use";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  const [themeMode, setThemeMode] = useLocalStorage("theme", "light");

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <BrowserRouter>
        <AppStyled className="app">
          <Sidebar />
          <Content />
        </AppStyled>
      </BrowserRouter>
    </ThemeProvider>
  );
}
