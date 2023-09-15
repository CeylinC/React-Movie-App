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
} from "firebase/firestore";
import { moviesRef, db } from "../util/firebase";
import { ISortSelector, IColumn, IMovie, IUser } from "../model";

let lastKey = "";

const getData = async (query: QuerySnapshot, sortType: string) => {
  const movies: IMovie[] = [];
  query.forEach((doc) => {
    movies.push({
      id: doc.id ?? "",
      name: doc.data().name ?? "",
      poster: doc.data().poster ?? "",
      year: doc.data().year ?? 0,
      imdb: doc.data().imdb ?? 0.0,
      category: doc.data().category ?? "",
      directors: doc.data().directors ?? "",
      stars: doc.data().stars ?? "",
      duration: doc.data().duration ?? "",
      writers: doc.data().writers ?? "",
      background: doc.data().background ?? "",
      description: doc.data().description ?? "",
    });
    lastKey = doc.data()[sortType];
  });
  return movies;
};

const firstQuery = async (sort: ISortSelector) => {
  lastKey = "";
  const batch = query(moviesRef, orderBy(sort.sort, sort.order), limit(3));
  return await getDocs(batch);
};

const nextQuery = async (sort: ISortSelector) => {
  const batch = query(
    moviesRef,
    orderBy(sort.sort, sort.order),
    limit(3),
    startAfter(lastKey)
  );
  return await getDocs(batch);
};

const getMovieList = async () => {
  const movies: IMovie[] = [];
  const querySnapshot = await getDocs(moviesRef);
  querySnapshot.forEach((doc) => {
    movies.push({
      id: doc.id ?? "",
      name: doc.data().name ?? "",
      poster: doc.data().poster ?? "",
      year: doc.data().year ?? 0,
      imdb: doc.data().imdb ?? 0.0,
      category: doc.data().category ?? "",
      directors: doc.data().directors ?? "",
      stars: doc.data().stars ?? "",
      duration: doc.data().duration ?? "",
      writers: doc.data().writers ?? "",
      background: doc.data().background ?? "",
      description: doc.data().description ?? "",
    });
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
    return {
      id: docSnap.id ?? "",
      name: movie.name ?? "",
      poster: movie.poster ?? "",
      year: movie.year ?? 0,
      imdb: movie.imdb ?? 0.0,
      category: movie.category ?? "",
      directors: movie.directors ?? "",
      stars: movie.stars ?? "",
      duration: movie.duration ?? "",
      writers: movie.writers ?? "",
      background: movie.background ?? "",
      description: movie.description ?? "",
    };
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

export {
  getData,
  firstQuery,
  nextQuery,
  getMovieList,
  updateMovie,
  deleteMovie,
  uploadMovie,
  getMovieData,
  updateFavoriteMovies,
};
