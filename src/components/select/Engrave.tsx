import { AutoComplete } from "antd";

import engraveOptions from "~/assets/json/engrave.json";

export default function Engrave() {
  return (
    <AutoComplete
      style={{ width: "200px" }}
      options={engraveOptions.map((option) => ({ value: option.label }))}
      placeholder="각인 효과를 입력해주세요"
      filterOption={(value, option) => option?.value.includes(value)}
    />
  );
}
