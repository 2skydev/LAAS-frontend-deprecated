import { AutoComplete, AutoCompleteProps } from "antd";
import accessoryOptions from "~/assets/json/accessory.json";

export default function Accessory(props: AutoCompleteProps) {
  return (
    <AutoComplete
      style={{ width: "80px" }}
      placeholder="장신구"
      options={accessoryOptions.map((option) => ({ value: option.label }))}
      filterOption={(value, option) =>
        value.split("").every((word) => option?.value.includes(word))
      }
      {...props}
    />
  );
}
