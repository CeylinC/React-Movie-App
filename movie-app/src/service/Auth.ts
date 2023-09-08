import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../util/firebase";
import { NavigateFunction } from "react-router-dom";
import { ErrorCode } from "../model/enum/Error";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { IUser } from "../model/interface/IUser";

let user: User;

const createUser = (username: string, email: string, password: string, navigate: NavigateFunction, setUser: (user: IUser) => void) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            user = userCredential.user;
            setUserData({username: username, email: user.email ? user.email : "", favoriteMovies: []}, user.uid, navigate);
        })
        .catch((error) => {
            const errorCode = error.code;
            switch(errorCode){
                case ErrorCode.emailAlreadyInUse:
                    alert("Email Already in Use");
                    break;
                case ErrorCode.weakPassword:
                    alert("Weak Password");
                    break;
                case ErrorCode.invalidEmail:
                    alert("Invalid Email");
                    break;
                case ErrorCode.tooManyRequests:
                    alert("You're too fast. Wait a little")
                    break
                default:
                    alert(errorCode);
                    break;
            }
        });
}

const loginUser = (email: string, password: string, navigate: NavigateFunction, setUser: (user: IUser) => void) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            user = userCredential.user;
            getUserData(user.uid, setUser, navigate);
        })
        .catch((error) => {
            const errorCode = error.code;
            switch(errorCode){
                case ErrorCode.userNotFound:
                    alert("User not found :(");
                    break;
                case ErrorCode.wrongPassword:
                    alert("Wrong Password");
                    break;
                case ErrorCode.invalidEmail:
                    alert("Invalid Email");
                    break;
                case ErrorCode.tooManyRequests:
                    alert("You're too fast. Wait a little")
                    break
                default:
                    alert(errorCode);
                    break;
            }
        });
}
const getUserData = async (userId: string, setUser: (user: IUser) => void, navigate: NavigateFunction) => {
    const docRef = doc(db, "users", userId);
    const docSnap =  await getDoc(docRef);
    const userData = docSnap.data();
    if(userData){
        sessionStorage.setItem("user", JSON.stringify({username: userData.username, email: userData.email, favoriteMovies: userData.favoriteMovies}));
        navigate("/admin/movie-list");
    }
    else{
        console.log("Hata, user state düzenlenemedi");
    }
}

const setUserData = async (user: IUser, userId: string, navigate: NavigateFunction) => {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, user);
    sessionStorage.setItem("user", JSON.stringify(user));
    navigate("/admin/movie-list");
}

export { createUser, loginUser };