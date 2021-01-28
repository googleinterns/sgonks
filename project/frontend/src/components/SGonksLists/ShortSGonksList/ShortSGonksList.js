import React from "react";
import classes from "./ShortSGonksList.module.css";

import ShortSGonksRow from "./ShortSGonksRow/ShortSGonksRow";

const ShortSGonksList = (props) => {
  console.log(props.sgonks);
  const sGonksList = props.sgonks.slice(0, 10).map((singularSGonk) => {
    console.log(singularSGonk);
    return <ShortSGonksRow sgonk={singularSGonk}></ShortSGonksRow>;
  });

  return (
    <div {...props} className={classes.List}>
      {sGonksList}
    </div>
  );
};

export default ShortSGonksList;
