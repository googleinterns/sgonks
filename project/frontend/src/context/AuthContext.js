import React, { useState } from "react";
import { signIn, signOut } from "../services/firebase";

const { Provider, Consumer } = React.createContext();

export const AuthContext = (props) => {
  const [user, setUser] = useState({ signedIn: false });

  const auth = {
    handleAuth: () => signIn(setUser),
    clearAuth: () => signOut(setUser),
    user: user,
  };

  return <Provider value={auth}>{props.children}</Provider>;
};

export default Consumer;
