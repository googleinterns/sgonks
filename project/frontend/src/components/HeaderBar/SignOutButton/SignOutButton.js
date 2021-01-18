import React, { useContext } from "react";
import LinkButton from "../../../components/UI/LinkButton/LinkButton";
import { AuthContext } from "../../../App";

const SignOutButton = (props) => {
  const authContext = useContext(AuthContext);

  return (
    <LinkButton to="/signin" onClick={authContext.clearAuth} inverted="true">
      Sign out
    </LinkButton>
  );
};

export default SignOutButton;
