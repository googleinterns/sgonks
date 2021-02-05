import React from "react";
import classes from "./Button.module.css";
import classnames from "classnames";

const Button = (props) => {
  const { inverted, className, padding, ...otherProps } = props;

  const buttonStyle = props.inverted ? classes.White : classes.Blue;

  return (
    <button
      className={classnames(classes.Button, props.className, buttonStyle)}
      style={padding ? { padding: padding } : { padding: "10px 40px" }}
      {...otherProps}
    />
  );
};

export default Button;
