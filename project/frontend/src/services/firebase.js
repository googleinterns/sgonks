import firebase from "firebase/app";
import "firebase/auth";

import firebaseConfig from "./config/firebaseConfig";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

console.log(firebaseConfig);

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    .then((res) => {
      console.log("authed here");
      console.log(res.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const onAuthStateChange = (callback) => {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      callback({
        signedIn: true,
        name: user.displayName,
        email: user.email,
      });
    } else {
      callback({
        signedIn: false,
      });
    }
  });
};

export const signOut = () => {
  firebase.auth().signOut();
};
