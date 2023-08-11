import "./Selector.css";
import { Select, ConfigProvider } from "antd";

interface IProp{
    placeholder: string,
    options: { label: string, value: string}[]
}

function Selector({ placeholder, options }:IProp) {
  return (
    <div className="selector">
      <label className="selector-label">{placeholder}</label>
      <ConfigProvider>
      <Select
        className="selector-select"
        bordered={false}
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={options}
      />
      </ConfigProvider>

    </div>
  );
}

export default Selector;
