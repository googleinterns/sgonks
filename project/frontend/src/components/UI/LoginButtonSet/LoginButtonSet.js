import React, { useContext } from "react";
import LinkButton from "../LinkButton/LinkButton";
import classes from "./LoginButtonSet.module.css";
import { AuthContext } from "../../../App";

const LoginButtonSet = (props) => {
  const authContext = useContext(AuthContext);

  return (
    <div className={classes.ButtonSetContainer}>
      <LinkButton inverted="true">What is sGonks?</LinkButton>
      <LinkButton to="/compselect" onClick={authContext.handleAuth}>
        Sign in
      </LinkButton>
    </div>
  );
};

export default LoginButtonSet;
