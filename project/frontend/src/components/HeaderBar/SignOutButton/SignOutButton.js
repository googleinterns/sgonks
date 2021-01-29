import React, { useContext } from "react";
import LinkButton from "../../../components/UI/LinkButton/LinkButton";
import Consumer from "../../../context/AuthContext";

const SignOutButton = (props) => {
  return (
    <Consumer>
      {(context) => {
        return (
          <LinkButton to="/signin" onClick={context.clearAuth} inverted="true">
            Sign out
          </LinkButton>
        );
      }}
    </Consumer>
  );
};

export default SignOutButton;
