import React from "react";
import { withRouter } from "react-router";
import classes from "./LinkButton.module.css";
import classnames from "classnames";

const LinkButton = (props) => {
  const buttonStyle = props.inverted ? classes.White : classes.Blue;

  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    width,
    ...rest
  } = props;

  return (
    <button
      className={classnames(classes.Button, buttonStyle)}
      style={{ width: width ?? "auto" }}
      {...rest}
      onClick={(event) => {
        onClick && onClick(event);
        history.push(to);
      }}
    />
  );
};

export default withRouter(LinkButton);
