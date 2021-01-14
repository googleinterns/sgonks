import React from 'react';
import LinkButton from "../LinkButton/LinkButton";
import classes from "./LoginButtonSet.module.css"

const LoginButtonSet = props => {

    return (
        <div className={classes.ButtonSetContainer}>
            <LinkButton inverted>What is sGonks?</LinkButton>
            <LinkButton>Sign in</LinkButton>
        </div>
    )
}

export default LoginButtonSet;