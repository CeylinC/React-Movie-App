import { renderHook } from "@testing-library/react";
import { useUserControl } from "./useUserControl";
import { IUser } from "../../model";
import { useState } from "react";

describe("useUserControl", () => {
  const [user, setUser] = useState<IUser>();
  it("should that the component is working.", () => {
    renderHook(() => useUserControl(user, setUser));
    expect(user).toBeUndefined();
  });
});
