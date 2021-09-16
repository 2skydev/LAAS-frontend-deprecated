import { AutoComplete, AutoCompleteProps } from "antd";

const options = Array(9)
  .fill("")
  .map((_, i) => ({ value: i + 1 + "0이상" }));

export default function Quality(props: AutoCompleteProps) {
  return (
    <AutoComplete
      style={{ width: "80px" }}
      options={options}
      placeholder="품질"
      filterOption={(value, option) => option?.value.includes(value)}
      {...props}
    />
  );
}
