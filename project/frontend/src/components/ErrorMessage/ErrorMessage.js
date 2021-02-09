import React from "react";
import classes from "./ErrorMessage.module.css";

const ErrorMessage = (props) => {
  return (
    <p className={classes.ErrorMessage}>Failed to load {props.children} :(</p>
  );
};

export default ErrorMessage;
