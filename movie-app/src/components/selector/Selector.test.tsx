import { render, queryAllByAttribute, queryByAttribute } from "@testing-library/react";
import { Selector } from "./Selector";

const getByClass = queryByAttribute.bind(null, "class");
const getAllByClass = queryAllByAttribute.bind(null, "class");

const param = {
  placeholder: "Placeholder",
  onChange: () => {},
  defaultValue: "defaultValue",
  options: [
    { label: "Default Value", value: "defaultValue" },
    { label: "Value", value: "value" },
  ],
};

const setup = () => {
  const { container } = render(
    <Selector
      placeholder={param.placeholder}
      defaultValue={param.defaultValue}
      onChange={param.onChange}
      options={param.options}
    />
  );
  return container;
};

describe("Selector Component", () => {
  test("The options is available in the options of the Selector Component.", () => {
    const container = setup();
    const selectorOptions = getAllByClass(
      container,
      "ant-select-item-option-content"
    );
    selectorOptions.forEach((option, index) => {
      expect(option).toEqual(param.options[index]);
    });
  });
  test("The placeholder should appear in the Selector Component", () => {
    const container = setup();
    const placeholder = getByClass(container, "selector-label");
    expect(placeholder).toHaveTextContent(param.placeholder);
  });
});
