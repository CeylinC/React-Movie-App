import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../util/firebase";
import { NavigateFunction } from "react-router-dom";
import { ErrorCode } from "../enum/Error";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { IUser } from "../interface/IUser";

let user: User;

const createUser = (username: string, email: string, password: string, navigate: NavigateFunction, setUser: (user: IUser) => void) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            user = userCredential.user;
            setUserData(setUser, {username: username, email: user.email ? user.email : "", favoriteMovies: []}, user.uid, navigate);
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
    console.log(userData);
    if(userData){
        setUser({username: userData.displayname, email: userData.email, favoriteMovies: userData.favoriteMovies})
        navigate("/admin");
    }
    else{
        console.log("Hata, user state düzenlenemedi");
    }
}

const setUserData = async (setUser: (user: IUser) => void, user: IUser, userId: string, navigate: NavigateFunction) => {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, user);
    setUser(user);
    navigate("/admin");
}

export { createUser, loginUser };