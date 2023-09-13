import { useEffect, useState } from "react";
import { Selector } from "../../../../components";
import { useMoviesStore } from "../../../../state";
import { ISortSelector } from "../../../../model";
import { firstQuery, getData, nextQuery } from "../../../../service";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { MovieCardSection } from "../../../../feature";
import "./MovieList.css";

export function HomepageMovieList() {
    const [searchParams, setSearchParams] = useSearchParams();
    let currentParams = Object.fromEntries([...searchParams]);
    const { movies, addMovie, clearMovies } = useMoviesStore();
    const [filter, setFilter] = useState<string>(currentParams.filter !== undefined ? currentParams.filter : "all");
    const [sort, setSort] = useState<ISortSelector>({ sort: currentParams.sort !== undefined ? currentParams.sort : "name", order: currentParams.order === "asc" || currentParams.order === "desc" ? currentParams.order : "asc" });
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreData = () => {
        const getMovieData = async () => {
            let data = await getData(await nextQuery(sort), sort.sort);
            data.forEach(a => addMovie(a));
        }
        getMovieData();
        if (movies.length >= 50) {
            setHasMore(false);
        }
    }

    const getFirstMovieData = () => {
        const getMovieData = async () => {
            let movieList = await getData(await firstQuery(sort), sort.sort);
            movieList.forEach(movie => addMovie(movie));
        }
        getMovieData();
    }

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
    }

    useEffect(() => {
        setSearchParams({ filter: filter, sort: sort.sort, order: sort.order });
    }, [sort]);

    useEffect(() => {
        currentParams = Object.fromEntries([...searchParams]);
        if (!currentParams.search && currentParams.filter) {
            clearMovies();
            getFirstMovieData();
            setHasMore(true);
        }
    }, [searchParams])

    useEffect(() => setSearchParams({ filter: filter, sort: sort.sort, order: sort.order }), [filter]);


    return (
        <div className="movie-list">
            {
                currentParams.search === undefined ?
                    <>
                        <div className="sort-filter-menu">
                            <div className="sort-menu">
                                <Selector placeholder="Sort By : "
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
                                        sort.order === "desc" ? (sort.sort === "name" ? "Z - A" : "Latest") : (sort.sort === "name" ? "A - Z" : "Oldest")
                                    }
                                    onChange={(value) => changeSort(value)}
                                />
                            </div>
                            <div className="filter-menu">
                                <Selector placeholder="Filter By : "
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
                            dataLength={movies.length}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={<h4>Loading...</h4>}
                            endMessage={<p>No more items to load</p>}
                        >
                            <MovieCardSection filter={filter} />
                        </InfiniteScroll>
                    </>
                    :
                    <MovieCardSection filter='all' search={currentParams.search} />

            }
        </div>
    );
}