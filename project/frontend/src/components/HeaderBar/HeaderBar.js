import React, { useContext } from "react";
import classes from "./HeaderBar.module.css";
import Logo from "../../assets/sGonksLogo.png";
import { Link, NavLink } from "react-router-dom";
import SignOutButton from "./SignOutButton/SignOutButton";
import LoginButtonSet from "../UI/LoginButtonSet/LoginButtonSet";
import Aux from "../../hoc/Auxiliary";

const HeaderBar = (props) => {
  let innerNavLinks = [
    { linkTo: "/mysgonks", display: "My sGonks", key: "mysgonks" },
    { linkTo: "/competition", display: "Competition", key: "competition" },
    { linkTo: "/marketplace", display: "Marketplace", key: "marketplace" },
  ];

  let innerNav = props.innerNav ? (
    <nav className={classes.Navigation}>
      <ul>
        {innerNavLinks.map((link) => {
          return (
            <li key={link.key}>
              <NavLink to={link.linkTo} activeClassName={classes.active}>
                {link.display}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  ) : null;

  const clearCompId = () => {
    localStorage.setItem("compId", 0);
    props.compIdChanged(0);
  };

  let buttonSet = props.loggedIn ? (
    <Aux>
      <nav className={classes.Navigation}>
        <ul>
          <li>
            <NavLink
              to="/compselect"
              onClick={clearCompId}
              activeClassName={classes.active}
            >
              Select Competition
            </NavLink>
          </li>
        </ul>
      </nav>
      <SignOutButton></SignOutButton>
    </Aux>
  ) : (
    <LoginButtonSet></LoginButtonSet>
  );

  return (
    <header className={classes.HeaderBar}>
      <Link to="/">
        <img src={Logo} className={classes.Logo} />
      </Link>
      <div className={classes.NavigationContainer}>{innerNav}</div>
      <div className={classes.ButtonsContainer}>{buttonSet}</div>
    </header>
  );
};

export default HeaderBar;
