import { AutoComplete } from "antd";

const options = [{ value: "목걸이" }, { value: "귀걸이" }, { value: "반지" }];

export default function Accessory() {
  return (
    <AutoComplete
      style={{ width: "200px" }}
      options={options}
      placeholder="장신구를 입력해주세요"
      filterOption={(value, option) => option?.value.includes(value)}
    />
  );
}
