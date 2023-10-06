import React from "react";

const Adminpage = React.lazy(() => import("./page/admin/admin-home/Adminpage"));
const Homepage = React.lazy(() => import("./page/home/home/Homepage"));
const LogInpage = React.lazy(() => import("./page/log-in/LogInpage"));
const SignUppage = React.lazy(() => import("./page/sign-up/SignUppage"));
const FavoriteMovieList = React.lazy(
  () => import("./page/home/subpage/favorite-movie-list/FavoriteMovieList")
);
const MovieDetail = React.lazy(
  () => import("./page/home/subpage/movie-detail/MovieDetail")
);
const HomepageMovieList = React.lazy(
  () => import("./page/home/subpage/movie-list/MovieList")
);
const MovieListpage = React.lazy(
  () => import("./page/admin/subpage/movie-list/MovieListpage")
);
const AddMoviepage = React.lazy(
  () => import("./page/admin/subpage/add-movie/AddMoviepage")
);

export const routes = [
  {
    path: "/",
    element: <Homepage />,
    route: [
      { path: "/favorite", element: <FavoriteMovieList /> },
      { path: "/movie", element: <MovieDetail /> },
      { path: "/", element: <HomepageMovieList /> },
    ],
  },
  {
    path: "/admin",
    element: <Adminpage />,
    route: [
      { path: "/admin/movie-list", element: <MovieListpage /> },
      { path: "/admin/add-movie", element: <AddMoviepage /> },
    ],
  },
  { path: "/log-in", element: <LogInpage /> },
  { path: "/sign-up", element: <SignUppage /> },
];
