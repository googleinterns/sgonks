import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import classes from "./HeaderBar.module.css";
import Logo from "../../assets/sGonksLogo.png";
import { Link, NavLink } from "react-router-dom";
import SignOutButton from "./SignOutButton/SignOutButton";
import LoginButtonSet from "../UI/LoginButtonSet/LoginButtonSet";
import Aux from "../../hoc/Auxiliary";

const HeaderBar = (props) => {
  const authContext = useContext(AuthContext);

  let innerNavLinks = [
    { linkTo: "/mysgonks", display: "My sGonks", key: "mysgonks" },
    { linkTo: "/competition", display: "Competition", key: "competition" },
    { linkTo: "/marketplace", display: "Marketplace", key: "marketplace" },
  ];

  let innerNav = null;
  if (props.innerNav) {
    innerNav = (
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
    );
  }

  const clearCompId = () => {
    localStorage.setItem("compId", 0);
    props.updateCompId(0);
  };

  let buttonSet = <LoginButtonSet></LoginButtonSet>

  if (authContext.isLoggedIn) {
    buttonSet = (
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
    );
  }

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
