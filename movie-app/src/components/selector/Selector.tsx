import "./Selector.css";
import { Select, ConfigProvider } from "antd";

interface IProp{
    placeholder: string,
    options: { label: string, value: string}[],
    onChange: (value: string) => void,
    defaultValue: string,
}

function Selector({ placeholder, options, onChange, defaultValue }:IProp) {
  return (
    <div className="selector">
      <label className="selector-label">{placeholder}</label>
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

export default Selector;