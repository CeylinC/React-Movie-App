import { act, renderHook } from "@testing-library/react";
import { useUserStore } from "./useUserStore";
import { User } from "../../model";

describe("useUserStore", () => {
  it("should set user correctly", () => {
    const { result } = renderHook(() => useUserStore());

    const dummyUser = new User();
    act(() => result.current.setUser(dummyUser));

    expect(result.current.user).toEqual(dummyUser);
  });

  it("should set favorite movies correctly", () => {
    const { result } = renderHook(() => useUserStore());

    const dummyUser = new User();
    const moviesId = ["movie-id-1", "movie-id-2"];
    act(() => {
      result.current.setUser(dummyUser);
      result.current.setFavoriteMovies(moviesId);
    });

    expect(result.current.user?.favoriteMovies).toEqual(moviesId);
  });

  it("should clear user correctly", () => {
    const { result } = renderHook(() => useUserStore());

    const dummyUser = new User();
    act(() => result.current.setUser(dummyUser));
    expect(result.current.user).toEqual(dummyUser);

    act(() => result.current.clearUser());
    expect(result.current.user).toBeUndefined();
  });
});
