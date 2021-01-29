import React from "react";
import classes from "./ShortSGonksList.module.css";

import ShortSGonksRow from "./ShortSGonksRow/ShortSGonksRow";
import { Link } from "react-router-dom";

const ShortSGonksList = (props) => {
  console.log(props.sgonks);
  const sGonksList = props.sgonks.slice(0, 7).map((singularSGonk) => {
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
      {props.sgonks.length > 7 ? (
        <Link to="/toroutelater" className={classes.SeeAll}>
          ...more
        </Link>
      ) : null}
    </div>
  );
};

export default ShortSGonksList;