import { renderHook } from "@testing-library/react";
import { favoriteControl, capitalize, findMovie } from "./index";
import { useUserStore } from "../hook";
import { Movie, User } from "../model";
import { act } from "react-dom/test-utils";
import * as service from "../service";

jest.mock("../service", () => ({ getMovieData: jest.fn() }));

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

  it("findMovie function is correctly", async () => {
    const movieID = "123456";
    const movieData = new Movie({ name: "mock movie" });
    const setMovieMock = jest.fn();
    (service.getMovieData as jest.Mock).mockImplementation(() => movieData);
    await findMovie(movieID, setMovieMock);
    expect(service.getMovieData).toBeCalled();
    expect(setMovieMock).toBeCalled();
  });
});
