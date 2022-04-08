import { AutoComplete, AutoCompleteProps, Select } from "antd";
import gradeOptions from "~/assets/json/grade.json";

export default function Grade(props: AutoCompleteProps) {
  return (
    <Select
      style={{ width: 70 }}
      placeholder="등급"
      options={gradeOptions.map((option) => ({ value: option.label }))}
      {...props}
    />
  );
}
