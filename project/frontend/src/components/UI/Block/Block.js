import React from "react";
import classes from "./Block.module.css";
import classnames from "classnames";

/* Content wrapper which wraps its children in a standardised background/border
Can receive further styling from parent component on top of existing styling.
*/
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
