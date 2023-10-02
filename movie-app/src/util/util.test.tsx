import { renderHook } from "@testing-library/react";
import { favoriteControl } from "./favoriteControl";
import { useUserStore } from "../hook";
import { User } from "../model";
import { act } from "react-dom/test-utils";
import { capitalize } from "./capitalize";

describe("Util Functions", () => {
  test("favoriteControl function is correctly", () => {
    const { result } = renderHook(() => useUserStore());
    const dummyUser = new User({ favoriteMovies: ["5FERCG5pcdYOKeO3i10Q"] });
    act(() => result.current.setUser(dummyUser));
    result.current.user?.favoriteMovies.forEach((movieId) => {
      let isFavorite = false;
      const setFavorite = (value: boolean) => {
        isFavorite = value;
      };
      favoriteControl(dummyUser, movieId, setFavorite);
      expect(isFavorite).toBeTruthy();
    });
  });
  test("capitalize function is correctly", () => {
    const control = "mock";
    const value = capitalize(control);
    expect(value).toBe("Mock");
  });
});
