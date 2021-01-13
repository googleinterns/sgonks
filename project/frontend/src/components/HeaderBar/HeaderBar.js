import React from "react"
import classes from "./HeaderBar.module.css"
import Logo from "../../assets/sGonksLogo.png"
import { Link, NavLink } from "react-router-dom"

const HeaderBar = (props) => {
  return (
    <header className={classes.HeaderBar}>
      <Link to="/">
        <img src={Logo} className={classes.Logo} />
      </Link>
      <div className={classes.NavigationContainer}>
        <nav className={classes.Navigation}>
          <ul>
            <li>
              <Link to="/">My sGonks</Link>
            </li>
            <li>
              <Link to="/">Competition</Link>
            </li>
            <li>
              <Link to="/">sGonks Market</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={classes.ButtonsContainer}>
        <button>button</button>
        <button>button2</button>
      </div>
    </header>
  )
}

export default HeaderBar
