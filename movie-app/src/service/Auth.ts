import {
  User,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../util";
import { NavigateFunction } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  User as UserModel,
  ErrorCode,
  IUser,
  Movie,
  loginUserErrorMessage,
} from "../model";

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
          alert(
            loginUserErrorMessage[errorCode as ErrorCode] ?? "Unexpected Error"
          );
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
          alert(
            loginUserErrorMessage[errorCode as ErrorCode] ?? "Unexpected Error"
          );
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
      return new UserModel(user);
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
