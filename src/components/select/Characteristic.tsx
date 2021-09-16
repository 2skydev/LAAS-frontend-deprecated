import { AutoComplete, AutoCompleteProps } from "antd";
import characteristicOptions from "~/assets/json/characteristic.json";

export default function Characteristic(props: AutoCompleteProps) {
  return (
    <AutoComplete
      style={{ width: "80px" }}
      options={characteristicOptions.map((option) => ({ value: option.label }))}
      placeholder="특성"
      filterOption={(value, option) =>
        value.split("").every((word) => option?.value.includes(word))
      }
      {...props}
    />
  );
}
