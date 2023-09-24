import { render, queryByAttribute, screen } from "@testing-library/react";
import { MovieCard } from "./MovieCard";
import { Movie } from "../../model";
import { BrowserRouter } from "react-router-dom";

const getByClass = queryByAttribute.bind(null, "class");

let movie = new Movie({
  name: "Movie",
  year: 2000,
  poster: "url",
  id: "id",
});

const setup = () => {
  const { container } = render(
    <BrowserRouter>
      <MovieCard movie={movie} />
    </BrowserRouter>
  );
  return container;
};

test("The movie year in the Movie Card Component is correct", () => {
  const container = setup();
  const cardDescription = getByClass(container, "ant-card-meta-description");
  expect(cardDescription).toHaveTextContent(movie.year.toString());
});

test("The movie name in the Movie Card Component is correct", () => {
  const container = setup();
  const cardTitle = getByClass(container, "ant-card-meta-title");
  expect(cardTitle).toHaveTextContent(movie.name);
});

test("The movie poster in the Movie Card Component is correct", () => {
  setup();
  const cardCover = screen.getByAltText("Movie Poster");
  expect(cardCover).toHaveAttribute("src", movie.poster);
});

test("The movie imdb in the Movie Card Component is correct", () => {
  const container = setup();
  const cardImdb = getByClass(container, "imdb");
  expect(cardImdb).toHaveTextContent(movie.imdb.toString());
});

test("The movie url in the Movie Card Component is correct", () => {
  const container = setup();
  const cardUrl = getByClass(container, "movie-card");
  expect(cardUrl).toHaveAttribute("href", `/movie?id=${movie.id}`);
});

test("The title in the Movie Card Component is correct", () => {
  const container = setup();
  const cardTitle = getByClass(container, "movie-card");
  expect(cardTitle).toHaveAttribute("title", movie.name);
});
