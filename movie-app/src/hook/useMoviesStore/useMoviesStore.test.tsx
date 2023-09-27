import { act, renderHook } from "@testing-library/react";
import { useMoviesStore } from "./useMoviesStore";
import { Movie, Sort, User } from "../../model";

describe("useMoviesStore", () => {
  it("should add movie correctly.", () => {
    const { result } = renderHook(() => useMoviesStore());

    const dummyMovies = new Movie();
    act(() => result.current.addMovie(dummyMovies));

    expect(result.current.movies).toContain(dummyMovies);
  });

  it("should clear movie correctly", () => {
    const { result } = renderHook(() => useMoviesStore());

    const dummyMovies = new Movie();
    act(() => result.current.addMovie(dummyMovies));
    expect(result.current.movies).toContain(dummyMovies);

    act(() => result.current.clearMovies());
    expect(result.current.movies).toEqual([]);
  });

  it("should get first data correctly.", () => {
    const { result } = renderHook(() => useMoviesStore());

    act(() => {
      result.current.getFirstData({ sort: Sort.name, order: Sort.asc });
    });

    expect(result.current.movies).toHaveLength(10);
  });

  it("should fetch more data correctly", () => {
    const { result } = renderHook(() => useMoviesStore());
    const setHasMore = (value: boolean) => {};

    act(() => {
      result.current.fetchMoreData(20, setHasMore);
    });

    expect(result.current.movies).toHaveLength(10);
  });

  it("should get user's favorite movies correctly", () => {
    const { result } = renderHook(() => useMoviesStore());
    const dummyUser = new User({ favoriteMovies: ["5FERCG5pcdYOKeO3i10Q"] });

    act(() => {
      result.current.getUserFavoriteMovies(dummyUser);
    });

    result.current.movies.forEach((movie) => {
      expect(dummyUser.favoriteMovies).toContain(movie.id);
    });
  });
});
