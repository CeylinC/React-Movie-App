import {
  User,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../util/firebase";
import { NavigateFunction } from "react-router-dom";
import { ErrorCode } from "../model/enum/Error";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { IUser } from "../model/interface/IUser";

let user: User;

const createUser = (
  username: string,
  email: string,
  password: string,
  navigate: NavigateFunction
) => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          user = userCredential.user;
          await setUserData({
            username: username,
            email: user.email ? user.email : "",
            favoriteMovies: [],
            userId: user.uid,
            role: "user",
          });
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          switch (errorCode) {
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
              alert("You're too fast. Wait a little");
              break;
            default:
              alert(errorCode);
              break;
          }
        });
    })
    .catch((error) => {
      console.log(error.code + " " + error.message);
    });
};

const loginUser = (
  email: string,
  password: string,
  navigate: NavigateFunction
) => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          user = userCredential.user;
          const userData = await getUserData();
          if (userData) {
            userData.role === "admin"
              ? navigate("/admin/movie-list")
              : navigate("/");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          switch (errorCode) {
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
              alert("You're too fast. Wait a little");
              break;
            default:
              alert(errorCode);
              break;
          }
        });
    })
    .catch((error) => {
      console.log(error.code + " " + error.message);
    });
};
const getUserData = async () => {
  const userData = sessionStorage.getItem(
    "firebase:authUser:AIzaSyCDEZ6PISUyW3Pc_gVh7xYWhEqLjWdhd7w:[DEFAULT]"
  );
  if (userData) {
    const userId = JSON.parse(userData).uid;
    const docSnap = await getDoc(doc(db, "users", userId));
    const user = docSnap.data();
    if (user) {
      return {
        username: user.username ? user.username : "",
        favoriteMovies: user.favoriteMovies ? user.favoriteMovies : [],
        role: user.role ? user.role : "user",
        email: user.email ? user.email : "",
        userId: userId,
      };
    }
  }
};

const setUserData = async (user: IUser) => {
  const docRef = doc(db, "users", user.userId);
  await setDoc(docRef, {
    username: user.username,
    favoriteMovies: user.favoriteMovies,
    role: user.role,
    email: user.email,
  });
};

export { createUser, loginUser, getUserData };
