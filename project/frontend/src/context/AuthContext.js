import React from "react";
import { signInWithGoogle, signOut } from "../services/firebase";

const { Provider, Consumer } = React.createContext();

export const AuthContext = (props) => {
  const auth = {
    handleAuth: signInWithGoogle,
    clearAuth: signOut,
  };

  return <Provider value={auth}>{props.children}</Provider>;
};

export default Consumer;
