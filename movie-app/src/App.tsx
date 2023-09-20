import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React, { Suspense } from "react";
import { Loading } from "./components";

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

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<Loading height="100vh" />}>
          <Routes>
            <Route path="/" element={<Homepage />}>
              <Route
                path="/favorite"
                element={
                  <Suspense fallback={<Loading height="100vh" />}>
                    <FavoriteMovieList />
                  </Suspense>
                }
              />
              <Route
                path="/movie"
                element={
                  <Suspense fallback={<Loading height="100vh" />}>
                    <MovieDetail />
                  </Suspense>
                }
              />
              <Route
                path="/"
                element={
                  <Suspense fallback={<Loading height="100vh" />}>
                    <HomepageMovieList />
                  </Suspense>
                }
              />
            </Route>
            <Route path="/admin" element={<Adminpage />}>
              <Route
                path="/admin/movie-list"
                element={
                  <Suspense fallback={<Loading height="100vh" />}>
                    <MovieListpage />
                  </Suspense>
                }
              />
              <Route
                path="/admin/add-movie"
                element={
                  <Suspense fallback={<Loading height="100vh" />}>
                    <AddMoviepage />
                  </Suspense>
                }
              />
            </Route>
            <Route path="/log-in" element={<LogInpage />} />
            <Route path="/sign-up" element={<SignUppage />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
