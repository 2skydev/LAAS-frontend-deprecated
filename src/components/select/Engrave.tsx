import { AutoComplete, AutoCompleteProps } from "antd";

import engraveOptions from "~/assets/json/engrave.json";

export default function Engrave(props: AutoCompleteProps) {
  return (
    <AutoComplete
      style={{ width: "150px" }}
      options={engraveOptions.map((option) => ({ value: option.label }))}
      placeholder="각인"
      filterOption={(value, option) =>
        value.split("").every((word) => option?.value.includes(word))
      }
      allowClear
      {...props}
    />
  );
}
