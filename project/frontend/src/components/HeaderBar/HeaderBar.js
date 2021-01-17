import React, { useContext } from "react";
import classes from "./HeaderBar.module.css";
import Logo from "../../assets/sGonksLogo.png";
import { Link, NavLink } from "react-router-dom";
import LinkButton from "../UI/LinkButton/LinkButton";
import LoginButtonSet from "../UI/LoginButtonSet/LoginButtonSet";

const HeaderBar = (props) => {
  let innerNavLinks = [
    { linkTo: "/", display: "My sGonks", key: "mysgonks" },
    { linkTo: "/", display: "Competition", key: "competition" },
    { linkTo: "/", display: "Marketplace", key: "marketplace" },
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

  let buttonSet = props.loggedIn ? (
    <div>
      <NavLink>Select Competition</NavLink>
      <LinkButton inverted>Sign out</LinkButton>
    </div>
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
