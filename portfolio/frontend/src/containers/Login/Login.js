import React from "react"
import classes from "./Login.module.css"

const Login = (props) => {
    return (
        <div>
            <div className={classes.Header}>
                <img src="sGonksLogo.png" alt="sGonks Logo" className={classes.Logo}></img>
                <div className={classes.HeaderButtons}>
                    <button className={classes.Login} onClick={() => props.handler()}>Login</button>
                    <button className={classes.Help}>See how it works</button>
                </div>
            </div>

            <div className={classes.Body}>
                <div className={classes.Column}>
                    <h1>Who's the next trendsetter?</h1>
                    <p>Bacon ipsum dolor amet ground round chislic bresaola, andouille pig buffalo swine t-bone strip steak. 
                        Kevin shoulder frankfurter, venison short loin t-bone shank chislic chuck beef ribs pork buffalo. 
                        Rump hamburger jowl cow. Tail ribeye burgdoggen tongue. Chislic pork belly doner rump frankfurter. 
                        Jowl meatloaf ribeye beef pork, shoulder bresaola filet mignon.</p>
                    <div className={classes.Buttons}>
                        <button className={classes.Login} onClick={() => props.handler()}>Login</button>
                        <button className={classes.Help}>See how it works</button>
                    </div>
                </div>
                <div className={classes.Column}>
                    <p>Something visual will go here.</p>
                </div>
            </div>
        </div>
    )
}

export default Login