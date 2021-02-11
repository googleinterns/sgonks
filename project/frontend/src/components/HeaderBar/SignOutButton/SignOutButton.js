import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import LinkButton from "../../../components/UI/LinkButton/LinkButton";

const SignOutButton = (props) => {
  const authContext = useContext(AuthContext);

  return (
    <LinkButton to="/signin" onClick={authContext.logout} inverted="true">
      Sign out
    </LinkButton>
  );
};

export default SignOutButton;
