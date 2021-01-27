import React from "react";
import classes from "./Dashboard.module.css";
import classnames from "classnames";
import LinkButton from "../../components/UI/LinkButton/LinkButton";
import Block from "../../components/UI/Block/Block";

const Dashboard = (props) => {
  return (
    <div className={classes.DashboardContainer}>
      <div className={classes.Column}>
        <div className={classes.WelcomeMessage}>
          <h1 className={classes.WelcomeMessage}>
            Welcome back, <span>Firstname</span>!
          </h1>
        </div>
        <Block style={{ height: "43%" }}>
          {/* <h2>Time until end of competition:</h2>
          <p>20 days 19 hours etc</p>
          <h2>Your current ranking</h2> */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          vitae neque facilisis dui venenatis ullamcorper sed vitae dui. Aliquam
          pretium id erat vel dapibus. Aliquam porta justo ut ipsum porta, eget
          efficitur sapien efficitur. Maecenas tincidunt ut nisl vel vehicula.
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Aliquam et tellus elit. Donec mattis, quam a
          feugiat laoreet, sem dui elementum ex, ut imperdiet nunc eros a sem.
          Pellentesque imperdiet consectetur sagittis. Quisque venenatis eu
          libero sit amet maximus. Curabitur egestas, urna id tincidunt
          fermentum, nibh augue maximus augue, vel semper nulla justo sit amet
          nisi. In hac habitasse platea dictumst. Maecenas non felis a lorem
          vestibulum mollis a vitae ex. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Cras feugiat sapien ipsum, vitae laoreet elit rutrum
          scelerisque. In faucibus egestas massa egestas imperdiet. Vivamus
          ornare nunc in ligula mollis, nec feugiat sapien ultrices. Etiam id
          velit nisi. Vestibulum interdum lacinia velit, mattis luctus nunc
          mattis vel. Vivamus auctor auctor sem, at convallis lectus cursus at.
          Etiam vestibulum odio vel risus accumsan, id sagittis libero
          fermentum. Duis eleifend, dolor sed hendrerit ultrices, orci velit
          lobortis turpis, nec euismod quam ex ut elit. Cras mollis malesuada
          pulvinar. Vestibulum tempus semper magna quis lacinia.
        </Block>
        <div className={classnames(classes.Block, classes.TeammateBuy)}>
          xx bought
        </div>
      </div>
      <div className={classes.Column}>
        <div className={classnames(classes.Block, classes.YourSGonks)}>
          your sgonks
        </div>
        <div className={classnames(classes.Block, classes.ChartContainer)}>
          chart here
        </div>
        <LinkButton inverted="true">View my sGonks</LinkButton>
      </div>
      <div className={classes.Column}>
        <div className={classnames(classes.Block, classes.MoneyInfo)}>
          money info
        </div>
        <LinkButton>Buy sGonks</LinkButton>
        <div className={classnames(classes.Block, classes.TrendingSearches)}>
          trending searches
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
