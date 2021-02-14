import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/firebaseConfig";
import "regenerator-runtime/runtime";

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

const postIdTokenToAuth = (idToken) => {
  return fetch("/authentication", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: idToken,
  });
};

const googleProvider = new firebase.auth.GoogleAuthProvider();
const signIn = (callback) => {
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      let user = result.user;
      user.getIdToken().then((idToken) => {
        postIdTokenToAuth(idToken).then((res) => {
          callback(res.ok, {
            email: user.email,
            displayName: user.displayName,
            id: 1, // TEMPORARY
          });
        });
      });
    });
};

const signOut = () => {
  return firebase
    .auth()
    .currentUser.getIdToken(true)
    .then(() => {
      return fetch("/authentication", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
};

const persistLoginStatus = (user) => {
  // save user details to localstorage
  localStorage.setItem("user", JSON.stringify(user));
};

const loadLoginStatus = () => {
  // read user details from localstorage
  const user = JSON.parselocalStorage.getItem("user");
  if (user) {
    return {
      isLoggedIn: true,
      userInfo: user,
    };
  } else {
    return {
      isLoggedIn: false,
    };
  }
};

const clearPersistedLoginStatus = () => {
  // clear user details from localstorage
  localStorage.removeItem("user");
};

export default {
  signIn: signIn,
  signOut: signOut,
  persistLoginStatus: persistLoginStatus,
  loadLoginStatus: loadLoginStatus,
  clearPersistedLoginStatus: clearPersistedLoginStatus,
};
