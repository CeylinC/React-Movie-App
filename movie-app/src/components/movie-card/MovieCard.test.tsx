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

describe("Movie Card Component", () => {
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
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const cardImdb = container.getElementsByClassName("imdb");
    expect(cardImdb[0]).toHaveTextContent(movie.imdb.toString());
  });

  test("The movie url in the Movie Card Component is correct", () => {
    const container = setup();
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const cardUrl = container.getElementsByClassName("movie-card");
    expect(cardUrl[0]).toHaveAttribute("href", `/movie?id=${movie.id}`);
  });

  test("The title in the Movie Card Component is correct", () => {
    const container = setup();
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const cardTitle = container.getElementsByClassName("movie-card");
    expect(cardTitle[0]).toHaveAttribute("title", movie.name);
  });
});
