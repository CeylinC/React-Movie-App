import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


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
const moviesRef = collection(db, "movies");
const auth = getAuth(app);


export {moviesRef, db, auth};