import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 
import { IMovie } from "../interface/IMovie";

const firebaseConfig = {
    apiKey: "AIzaSyCDEZ6PISUyW3Pc_gVh7xYWhEqLjWdhd7w",
    authDomain: "react-movie-app-ceycey.firebaseapp.com",
    projectId: "react-movie-app-ceycey",
    storageBucket: "react-movie-app-ceycey.appspot.com",
    messagingSenderId: "592459605241",
    appId: "1:592459605241:web:28c24ec02c0ee57889ae28"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const getData = async () => {
    const movies : IMovie[] = [];
    const querySnapshot = await getDocs(collection(db, "movies"));
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

export default getData;