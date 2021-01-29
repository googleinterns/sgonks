import React from "react";
import LinkButton from "../LinkButton/LinkButton";
import classes from "./LoginButtonSet.module.css";
import Consumer from "../../../context/AuthContext";

const LoginButtonSet = (props) => {
  return (
    <Consumer>
      {(context) => {
        return (
          <div className={classes.ButtonSetContainer}>
            <LinkButton inverted="true">What is sGonks?</LinkButton>
            <LinkButton to="/compselect" onClick={context.handleAuth}>
              Sign in
            </LinkButton>
          </div>
        );
      }}
    </Consumer>
  );
};

export default LoginButtonSet;
