import { Switch } from "antd";
import { useLocalStorage } from "react-use";
import { useRecoilState } from "recoil";
import Section from "~/components/Section";
import { themeState } from "~/stores/theme";

export default function Setting() {
  const [, setThemeModeLS] = useLocalStorage("theme", "light");
  const [themeMode, setThemeMode] = useRecoilState(themeState);

  return (
    <div>
      <Section
        title="다크모드 설정"
        desc="라이트모드, 다크모드를 선택해서 사용하실 수 있습니다."
      >
        <Switch
          checked={themeMode === "dark"}
          onChange={(value) => {
            setThemeMode(value ? "dark" : "light");
            setThemeModeLS(value ? "dark" : "light");
          }}
          checkedChildren={<i className="bx bxs-moon" />}
          unCheckedChildren={<i className="bx bxs-sun" />}
        />
      </Section>
    </div>
  );
}
