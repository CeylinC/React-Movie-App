import {
  render,
  queryByAttribute,
} from "@testing-library/react";
import { Navbar } from "./Navbar";
import { MemoryRouter } from "react-router-dom";

const getByClass = queryByAttribute.bind(null, "class");
const getById = queryByAttribute.bind(null, "id");

const setup = (username?: string) => {
  const { container } = render(
    <MemoryRouter>
      <Navbar username={username} />
    </MemoryRouter>
  );
  return container;
};

describe("Navbar Component", () => {
  test("If the user is logged in, the navbar shows username.", () => {
    let param = {
      username: "Username",
    };
    const container = setup(param.username);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const username = container.getElementsByClassName("user-name");
    const result = param.username;
    expect(username[0]).toHaveTextContent(result);
  });

  test("If the user is not logged in, the navbar will say 'There!' instead of username shows.", () => {
    const container = setup();
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const username = container.getElementsByClassName("user-name");
    expect(username[0]).toHaveTextContent("There!");
  });

  test("When you click on the account, it takes you to the login page.", () => {
    const container = setup();
    const account = getById(container, "user");
    expect(account).toHaveAttribute("href", "/log-in");
  });
});
