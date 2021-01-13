import React from "react"
import classes from "./HeaderBar.module.css"
import Logo from "../../assets/sGonksLogo.png"
import { Link, NavLink } from "react-router-dom"

const HeaderBar = (props) => {
  let innerNavLinks = [
    { linkTo: "/", display: "My sGonks" },
    { linkTo: "/", display: "Competition" },
    { linkTo: "/", display: "Marketplace" },
  ]

  let innerNav = props.innerNav ? (
    <nav className={classes.Navigation}>
      <ul>
        {innerNavLinks.map((link) => {
          return (
            <li>
              <NavLink to={link.linkTo} activeClassName={classes.active}>
                {link.display}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  ) : null

  return (
    <header className={classes.HeaderBar}>
      <Link to="/">
        <img src={Logo} className={classes.Logo} />
      </Link>
      <div className={classes.NavigationContainer}>
        {innerNav}
      </div>
      <div className={classes.ButtonsContainer}>
        <button>button</button>
        <button>button2</button>
      </div>
    </header>
  )
}

export default HeaderBar
