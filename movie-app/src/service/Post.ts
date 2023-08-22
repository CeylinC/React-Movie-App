import { query, orderBy, limit, QuerySnapshot } from "firebase/firestore"; 
import { IMovie } from "../interface/IMovie";
import { getDocs, startAfter } from "firebase/firestore";
import moviesRef from "../util/firebase";
import { ISortSelector } from "../interface/ISortSelector";

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
    console.log(lastKey)
    const batch = query(moviesRef, orderBy(sort.sort, sort.order), limit(3), startAfter(lastKey));
    return await getDocs(batch);
}

export { getData, firstQuery, nextQuery };