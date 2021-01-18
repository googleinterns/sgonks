import React from "react"
import { withRouter } from "react-router"
import classes from "./LinkButton.module.css"
import classnames from "classnames"

const LinkButton = (props) => {
  const buttonStyle = props.inverted ? classes.White : classes.Blue;

  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    ...rest
  } = props

  return (
    <button
      className={classnames(classes.Button, buttonStyle)}
      {...rest}
      onClick={(event) => {
        onClick && onClick(event)
        history.push(to)
      }}
    />
  )
}

export default withRouter(LinkButton)
