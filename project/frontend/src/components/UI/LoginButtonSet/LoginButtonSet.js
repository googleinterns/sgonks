import React from "react"
import LinkButton from "../LinkButton/LinkButton"
import classes from "./LoginButtonSet.module.css"

const LoginButtonSet = (props) => {
  const fetchUserData = () => {
    fetch("./authentication")
      .then((response) => (response.json()))
      .then((data) => {
        console.log(data)
      })
  }

  return (
    <div className={classes.ButtonSetContainer}>
      <LinkButton inverted="true">What is sGonks?</LinkButton>
      <LinkButton onClick={() => fetchUserData()} to="/page">Sign in</LinkButton>
    </div>
  )
}

export default LoginButtonSet
