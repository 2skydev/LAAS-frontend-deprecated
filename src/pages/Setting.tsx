import { Switch } from "antd";
import Section from "~/components/Section";

export default function Setting() {
  return (
    <div>
      <Section
        title="테마 설정"
        desc="라이트모드, 다크모드를 선택해서 사용하실 수 있습니다."
      >
        <Switch></Switch>
      </Section>
    </div>
  );
}
