import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext"
import LinkButton from "../LinkButton/LinkButton";
import classes from "./LoginButtonSet.module.css";

const LoginButtonSet = (props) => {
  const authContext = useContext(AuthContext);

  return (
    <div className={classes.ButtonSetContainer}>
      <LinkButton inverted="true">What is sGonks?</LinkButton>
      <LinkButton to="/compselect" onClick={authContext.login}>
        Sign in
      </LinkButton>
    </div>
  );
};

export default LoginButtonSet;
