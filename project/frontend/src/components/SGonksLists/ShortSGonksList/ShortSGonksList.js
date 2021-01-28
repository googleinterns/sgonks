import React from "react";
import classes from "./ShortSGonksList.module.css";

import ShortSGonksRow from "./ShortSGonksRow/ShortSGonksRow";

const ShortSGonksList = (props) => {
  console.log(props.sgonks);
  const sGonksList = props.sgonks.slice(0, 8).map((singularSGonk) => {
    return (
      <ShortSGonksRow
        sgonk={singularSGonk}
        key={singularSGonk.searchTerm}
      ></ShortSGonksRow>
    );
  });

  return (
    <div {...props} className={classes.List}>
      {sGonksList}
    </div>
  );
};

export default ShortSGonksList;
