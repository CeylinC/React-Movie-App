import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../util/firebase";
import { NavigateFunction } from "react-router-dom";
import { ErrorCode } from "../enum/Error";

let user: User;

const createUser = (email: string, password: string, navigate: NavigateFunction) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            user = userCredential.user;
            navigate("/admin");
            console.log(user);
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

const loginUser = (email: string, password: string, navigate: NavigateFunction) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            user = userCredential.user;
            navigate("/admin");
            console.log(user);
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

const changeState = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          console.log(uid);
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
}

export { createUser, loginUser, changeState };