import React from "react";
import classes from "./Block.module.css";

const Block = (props) => {
  return (
    <div className={classes.Block} style={props.style}>
      <div className={classes.ContentWrapper}>{props.children}</div>
    </div>
  );
};

export default Block;
