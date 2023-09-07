import { query, orderBy, limit, QuerySnapshot, where, setDoc, doc, getDocs, startAfter, updateDoc, deleteDoc } from "firebase/firestore"; 
import { IMovie } from "../interface/IMovie";
import { moviesRef, db } from "../util/firebase";
import { ISortSelector } from "../interface/ISortSelector";
import { IColumn } from "../interface/IColumn";

let lastKey = "";

const getData = async (query : QuerySnapshot, sortType: string) => {
    const movies : IMovie[] = [];
    query.forEach((doc) => {
        movies.push({
            id: doc.id ?? "null",
            name: doc.data().name ?? "İsimsiz Film",
            poster: doc.data().poster ?? "",
            year: doc.data().year ?? 0,
            imdb: doc.data().imdb ?? 0.0,
            category: doc.data().category ?? ""
        });
        lastKey = doc.data()[sortType]; //Yıl ile sıranırken hata yaşanmaz mı?
    })
    return movies;
}

const firstQuery = async (sort: ISortSelector) => {
    lastKey = "";
    const batch = query(moviesRef, orderBy(sort.sort, sort.order), limit(3));
    return await getDocs(batch);
}

const nextQuery = async (sort: ISortSelector) => {
    const batch = query(moviesRef, orderBy(sort.sort, sort.order), limit(3), startAfter(lastKey));
    return await getDocs(batch);
}

const getMovieList = async () => {
    const movies : IMovie[] = [];
    const querySnapshot = await getDocs(moviesRef);
    querySnapshot.forEach((doc) => {
        movies.push({
            id: doc.id ?? "null",
            name: doc.data().name ?? "İsimsiz Film",
            poster: doc.data().poster ?? "",
            year: doc.data().year ?? 0,
            imdb: doc.data().imdb ?? 0.0,
            category: doc.data().category ?? ""
        });
    });
    return movies;
}

const updateMovie = async (movie: IColumn) => {
    const docRef = doc(db, "movies", movie.id);
    await updateDoc(docRef, {
        name: movie.name,
        year: movie.year,
        poster: movie.poster,
        category: movie.category,
        imdb: movie.imdb,
    });
}

const deleteMovie = async (movieId: string) => {
    await deleteDoc(doc(db, "movies", movieId));
}

const uploadMovie = async (movie: {name: string, imdb: number, year: number, poster: string, category: string}) => {
    await setDoc(doc(moviesRef), movie);
}

export { getData, firstQuery, nextQuery, getMovieList, updateMovie, deleteMovie, uploadMovie };