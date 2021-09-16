import { AutoComplete, AutoCompleteProps } from "antd";

const options = [{ value: "목걸이" }, { value: "귀걸이" }, { value: "반지" }];

export default function Accessory(props: AutoCompleteProps) {
  return (
    <AutoComplete
      style={{ width: "80px" }}
      options={options}
      placeholder="장신구"
      filterOption={(value, option) => option?.value.includes(value)}
      {...props}
    />
  );
}