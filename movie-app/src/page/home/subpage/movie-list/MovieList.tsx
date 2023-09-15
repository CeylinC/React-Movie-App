import { useEffect, useState } from "react";
import { Selector } from "../../../../components";
import { useMoviesStore } from "../../../../hook";
import { ISortSelector } from "../../../../model";
import {
  firstQuery,
  getData,
  getMoviesCount,
  nextQuery,
} from "../../../../service";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { MovieCardSection } from "../../../../feature";
import "./MovieList.css";
import { ConfigProvider, Space, Spin } from "antd";

export function HomepageMovieList() {
  const [searchParams, setSearchParams] = useSearchParams();
  let currentParams = Object.fromEntries([...searchParams]);
  const { movies, addMovie, clearMovies } = useMoviesStore();
  const [filter, setFilter] = useState<string>(
    currentParams.filter !== undefined ? currentParams.filter : "all"
  );
  const [sort, setSort] = useState<ISortSelector>({
    sort: currentParams.sort !== undefined ? currentParams.sort : "name",
    order:
      currentParams.order === "asc" || currentParams.order === "desc"
        ? currentParams.order
        : "asc",
  });
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [moviesCount, setMoviesCount] = useState<number>(0);

  const fetchMoreData = () => {
    const getMovieData = async () => {
      let movieData = await getData(await nextQuery(sort), sort.sort);
      movieData.forEach((data) => addMovie(data));
    };
    getMovieData();
    if (movies.length >= moviesCount) {
      setHasMore(false);
    }
  };

  const getFirstMovieData = () => {
    const getMovieData = async () => {
      let movieList = await getData(await firstQuery(sort), sort.sort);
      movieList.forEach((movie) => addMovie(movie));
    };
    clearMovies();
    getMovieData();
  };

  const changeSort = (value: string) => {
    clearMovies();
    switch (value) {
      case "az":
        setSort({ sort: "name", order: "asc" });
        break;
      case "za":
        setSort({ sort: "name", order: "desc" });
        break;
      case "latest":
        setSort({ sort: "year", order: "desc" });
        break;
      case "oldest":
        setSort({ sort: "year", order: "asc" });
        break;
      default:
        setSort({ sort: "name", order: "asc" });
        break;
    }
  };

  useEffect(() => {
    const findCount = async () => {
      const count = await getMoviesCount();
      setMoviesCount(count);
    };
    findCount();
  }, [moviesCount]);

  useEffect(() => {
    setSearchParams({ filter: filter, sort: sort.sort, order: sort.order });
  }, [sort]);

  useEffect(() => {
    currentParams = Object.fromEntries([...searchParams]);
    if (!currentParams.search && currentParams.filter) {
      getFirstMovieData();
      setHasMore(true);
    }
  }, [searchParams]);

  useEffect(
    () =>
      setSearchParams({ filter: filter, sort: sort.sort, order: sort.order }),
    [filter]
  );

  return (
    <div className="movie-list">
      {currentParams.search === undefined ? (
        <>
          <div className="sort-filter-menu">
            <div className="sort-menu">
              <Selector
                placeholder="Sort By : "
                options={[
                  {
                    value: "az",
                    label: "A - Z",
                  },
                  {
                    value: "za",
                    label: "Z - A",
                  },
                  {
                    value: "latest",
                    label: "Latest",
                  },
                  {
                    value: "oldest",
                    label: "Oldest",
                  },
                ]}
                defaultValue={
                  sort.order === "desc"
                    ? sort.sort === "name"
                      ? "Z - A"
                      : "Latest"
                    : sort.sort === "name"
                    ? "A - Z"
                    : "Oldest"
                }
                onChange={(value) => changeSort(value)}
              />
            </div>
            <div className="filter-menu">
              <Selector
                placeholder="Filter By : "
                options={[
                  {
                    value: "all",
                    label: "All",
                  },
                  {
                    value: "action",
                    label: "Action",
                  },
                  {
                    value: "comedy",
                    label: "Comedy",
                  },
                  {
                    value: "animation",
                    label: "Animation",
                  },
                  {
                    value: "horror",
                    label: "Horror",
                  },
                  {
                    value: "romantic",
                    label: "Romantic",
                  },
                ]}
                defaultValue={filter}
                onChange={(value) => setFilter(value)}
              />
            </div>
          </div>
          <InfiniteScroll
            style={{ overflow: "hidden" }}
            dataLength={movies.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div className="spin">
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#FFD369",
                    },
                  }}
                >
                  <Spin size="large" />
                </ConfigProvider>
              </div>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>No more movies to load</p>
            }
          >
            <MovieCardSection filter={filter} />
          </InfiniteScroll>
        </>
      ) : (
        <MovieCardSection filter="all" search={currentParams.search} />
      )}
    </div>
  );
}
