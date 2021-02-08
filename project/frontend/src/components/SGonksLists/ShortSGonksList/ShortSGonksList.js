import React from "react";
import classes from "./ShortSGonksList.module.css";

import ShortSGonksRow from "./ShortSGonksRow/ShortSGonksRow";
import { Link } from "react-router-dom";

const ShortSGonksList = (props) => {
  const MAX_ROWS_IN_SHORT_SGONKS_LIST = 7;

  if (props.sgonks === undefined) {
    return (
      <p className={classes.FailureMessage}>Failed to load investments :(</p>
    );
  }

  const sGonksList = props.sgonks
    .slice(0, MAX_ROWS_IN_SHORT_SGONKS_LIST)
    .map((singularSGonk, i) => {
      return (
        <ShortSGonksRow
          //TODO replace key with investment ID once it's ready
          key={i}
          searchterm={singularSGonk.searchItem}
          currentprice={singularSGonk.currentValue}
          datapoints={singularSGonk.dataPoints}
        ></ShortSGonksRow>
      );
    });

  return (
    <div {...props} className={classes.List}>
      {sGonksList}
      {props.sgonks.length > MAX_ROWS_IN_SHORT_SGONKS_LIST ? (
        <Link to="/toroutelater" className={classes.SeeAll}>
          ...more
        </Link>
      ) : null}
    </div>
  );
};

export default ShortSGonksList;
