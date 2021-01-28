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

  // admin
  //   .auth()
  //   .verifyIdToken(idToken)
  //   .then((decodedToken) => {
  //     const uid = decodedToken.uid;
  //     // ...
  //     console.log("Decoded uid  : " + uid);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });

  try {
    await fetch("/authentication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(idToken),
    });
    console.log("Sent ID token this si new :  " + idToken);
  } catch (error) {
    console.error("Error:", error);
  }

  // .then((verify) => {

  //   firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {

  //     // Send token to your backend via HTTPS
  //     // ...
  //   }).catch(function(error) {
  //     // Handle error
  //   });
  // })
  // .catch((error) => {
  //   console.log(error.message);
  // });
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
