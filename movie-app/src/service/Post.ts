import {
  query,
  orderBy,
  limit,
  QuerySnapshot,
  setDoc,
  doc,
  getDocs,
  startAfter,
  updateDoc,
  deleteDoc,
  getDoc,
  getCountFromServer,
} from "firebase/firestore";
import { moviesRef, db } from "../util/firebase";
import { ISortSelector, IColumn, IMovie, IUser, Movie } from "../model";

let lastKey = "";

const getData = async (query: QuerySnapshot, sortType: string) => {
  const movies: IMovie[] = [];
  query.forEach((doc) => {
    movies.push(new Movie({ ...doc.data(), id: doc.id }));
    lastKey = doc.data()[sortType];
  });
  return movies;
};

const getFirstQuery = async (sort: ISortSelector) => {
  lastKey = "";
  const batch = query(moviesRef, orderBy(sort.sort, sort.order), limit(20));
  return await getDocs(batch);
};

const getNextQuery = async (sort: ISortSelector) => {
  const batch = query(
    moviesRef,
    orderBy(sort.sort, sort.order),
    limit(20),
    startAfter(lastKey)
  );
  return await getDocs(batch);
};

const getMovieList = async () => {
  const movies: IMovie[] = [];
  const querySnapshot = await getDocs(moviesRef);
  querySnapshot.forEach((doc) => {
    movies.push(new Movie({ ...doc.data(), id: doc.id }));
  });
  return movies;
};

const updateMovie = async (movie: IColumn) => {
  const docRef = doc(db, "movies", movie.id);
  await updateDoc(docRef, {
    name: movie.name,
    year: movie.year,
    poster: movie.poster,
    category: movie.category,
    imdb: movie.imdb,
    directors: movie.directors,
    stars: movie.stars,
    duration: movie.duration,
    writers: movie.writers,
    background: movie.background,
    description: movie.description,
  });
};

const deleteMovie = async (movieId: string) => {
  await deleteDoc(doc(db, "movies", movieId));
};

const uploadMovie = async (movie: {
  name: string;
  imdb: number;
  year: number;
  poster: string;
  category: string;
  directors: string;
  stars: string;
  duration: string;
  writers: string;
  background: string;
  description: string;
}) => {
  await setDoc(doc(moviesRef), movie);
};

const getMovieData = async (id: string) => {
  const docSnap = await getDoc(doc(db, "movies", id));
  const movie = docSnap.data();
  if (movie) {
    return new Movie({ ...movie, id: docSnap.id });
  }
};

const updateFavoriteMovies = async (user: IUser) => {
  await updateDoc(doc(db, "users", user.userId), {
    favoriteMovies: user.favoriteMovies,
    email: user.email,
    username: user.username,
    role: user.role,
  });
};

const getMoviesCount = async () => {
  const snapshot = await getCountFromServer(moviesRef);
  return snapshot.data().count;
};

export {
  getData,
  getFirstQuery,
  getNextQuery,
  getMovieList,
  updateMovie,
  deleteMovie,
  uploadMovie,
  getMovieData,
  updateFavoriteMovies,
  getMoviesCount,
};
