import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/firebaseConfig";
import "regenerator-runtime/runtime";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = async () => {
  let verify = await auth.signInWithPopup(googleProvider);

  let idToken = await auth.currentUser.getIdToken(true);

  try {
    await fetch("/authentication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: idToken,
    });
    console.log("successfully sent the id token");
  } catch (error) {
    console.error("Error:", error);
  }
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

export const signOut = async () => {
  //send a POST request to the same servlet
  //clear the session that the uid is stored
  let idToken = await auth.currentUser.getIdToken(true);

  try {
    await fetch("/authentication", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: idToken,
    });
    console.log("user successfully signed out");
  } catch (error) {
    console.error("Error:", error);
  }
  firebase.auth().signOut();
};
