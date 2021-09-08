import { AutoComplete } from "antd";
import characteristicOptions from "~/assets/json/characteristic.json";

export default function Characteristic() {
  return (
    <AutoComplete
      style={{ width: "200px" }}
      options={characteristicOptions.map((option) => ({ value: option.label }))}
      placeholder="전투 특성을 입력해주세요"
      filterOption={(value, option) => option?.value.includes(value)}
    />
  );
}
