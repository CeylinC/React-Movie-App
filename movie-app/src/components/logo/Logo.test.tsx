import { queryByAttribute, render } from "@testing-library/react";
import { Logo } from "./Logo";
import { BrowserRouter } from "react-router-dom";

const getById = queryByAttribute.bind(null, "id");

const setup = () => {
  const { container } = render(
    <BrowserRouter>
      <Logo />
    </BrowserRouter>
  );
  return container;
};

describe("Logo Component", () => {
  it("should to the login page onclick", () => {
    const container = setup();
    const link = getById(container, "logo");
    expect(link).toHaveAttribute("href", "/");
  });
});
