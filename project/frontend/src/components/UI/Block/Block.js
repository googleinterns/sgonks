import React from "react";
import classes from "./Block.module.css";
import classnames from "classnames";

const Block = (props) => {
  return (
    <div
      className={classnames(classes.Block, props.className)}
      style={props.style}
    >
      <div className={classes.ContentWrapper}>{props.children}</div>
    </div>
  );
};

export default Block;
