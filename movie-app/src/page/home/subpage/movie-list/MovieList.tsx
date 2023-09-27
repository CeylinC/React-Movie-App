import { useEffect, useState } from "react";
import { Loading, Selector } from "../../../../components";
import { useMoviesStore } from "../../../../hook";
import { Category, ISortSelector, Sort } from "../../../../model";
import { getMoviesCount } from "../../../../service";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { MovieCardSection } from "../../../../feature";
import "./MovieList.css";
import { capitalize } from "../../../../util";

export default function HomepageMovieList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { movies, clearMovies, fetchMoreData, getFirstData } = useMoviesStore();
  const [filter, setFilter] = useState<string>(
    searchParams.get("filter") || "all"
  );
  const [sort, setSort] = useState<ISortSelector>({
    sort: searchParams.get("sort") || Sort.name,
    order:
      searchParams.get("order") === null
        ? Sort.asc
        : searchParams.get("order") === Sort.desc
        ? Sort.desc
        : Sort.asc,
  });
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [moviesCount, setMoviesCount] = useState<number>(0);

  const changeSort = (value: string) => {
    clearMovies();
    switch (value) {
      case Sort.az:
        setSort({ sort: Sort.name, order: Sort.asc });
        break;
      case Sort.za:
        setSort({ sort: Sort.name, order: Sort.desc });
        break;
      case Sort.latest:
        setSort({ sort: Sort.year, order: Sort.desc });
        break;
      case Sort.oldest:
        setSort({ sort: Sort.year, order: Sort.asc });
        break;
      default:
        setSort({ sort: Sort.name, order: Sort.asc });
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
    if (
      searchParams.get("search") === null &&
      searchParams.get("filter") !== null &&
      searchParams.get("order") !== null &&
      searchParams.get("sort") !== null
    ) {
      clearMovies();
      getFirstData(sort);
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
      {!searchParams.get("search") ? (
        <>
          <div className="sort-filter-menu">
            <div className="sort-menu">
              <Selector
                placeholder="Sort By : "
                options={[
                  {
                    value: Sort.az,
                    label: Sort.az.toUpperCase(),
                  },
                  {
                    value: Sort.za,
                    label: Sort.za.toLowerCase(),
                  },
                  {
                    value: Sort.latest,
                    label: capitalize(Sort.latest),
                  },
                  {
                    value: Sort.oldest,
                    label: capitalize(Sort.oldest),
                  },
                ]}
                defaultValue={
                  sort.order === Sort.desc
                    ? sort.sort === Sort.name
                      ? Sort.za.toUpperCase()
                      : capitalize(Sort.latest)
                    : sort.sort === Sort.name
                    ? Sort.az.toUpperCase()
                    : capitalize(Sort.oldest)
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
                    value: Category.action,
                    label: capitalize(Category.action),
                  },
                  {
                    value: Category.comedy,
                    label: capitalize(Category.comedy),
                  },
                  {
                    value: Category.animation,
                    label: capitalize(Category.animation),
                  },
                  {
                    value: Category.horror,
                    label: capitalize(Category.horror),
                  },
                  {
                    value: Category.romantic,
                    label: capitalize(Category.romantic),
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
            next={() => fetchMoreData(moviesCount, setHasMore, sort)}
            hasMore={hasMore}
            loader={<Loading height={"200px"} />}
            endMessage={
              <p style={{ textAlign: "center" }}>No more movies to load</p>
            }
          >
            <MovieCardSection filter={filter} />
          </InfiniteScroll>
        </>
      ) : (
        <MovieCardSection filter="all" />
      )}
    </div>
  );
}
