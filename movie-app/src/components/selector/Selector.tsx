import "./Selector.css";
import { Select, ConfigProvider } from "antd";

interface IProp {
  placeholder: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  defaultValue: string;
}

export function Selector({
  placeholder,
  options,
  onChange,
  defaultValue,
}: IProp) {
  return (
    <div className="selector rounded-md pl-3 m-3">
      <label className="selector-label text-sm">{placeholder}</label>
      <ConfigProvider>
        <Select
          className="selector-select"
          defaultValue={defaultValue}
          bordered={false}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={options}
          onChange={onChange}
        />
      </ConfigProvider>
    </div>
  );
}
