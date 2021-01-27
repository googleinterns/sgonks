import React from "react";
import classes from "./Explanation.module.css";
import { Link } from "react-router-dom";
import LinkButton from "../../components/UI/LinkButton/LinkButton";

const Explanation = (props) => {
  return (
    <div className={classes.ExplanationPageContent}>
      <div className={classes.ExplanationContainer}>
        <h1>What is sGonks?</h1>
        <p>
          SGonks work along similar ideas to virtual trading platforms, but
          instead of investing in stocks, the player can invest “Trend Bucks” in
          a Google search query. By buying into a search at a given point in
          time, they can cash out later and earn or lose “Trend Bucks" based on
          increased or decreased global interest in that query, as indicated by
          Google trends data. This provides an interactive way for teams to
          compete with one another to predict search trends overtime.
        </p>
      </div>

      <div className={classes.ExplanationContainer}>
        <h1>How does it work?</h1>
        <ol>
          <li>
            You can find all the competition you’re in in the or create a
            competition if you don’t have any.
          </li>
          <li>
            The aim of the game is to invest in the Google Search that you think
            it’s popularity is going to increase in the future and end up with
            the most trend bucks at the end of the competition.
          </li>
          <li>
            You will receive trends bucks based on the increased percentage of
            your google search investments. Same thing applies to losing trend
            bucks when the popularity of your investment decreases.
          </li>
          <li>
            You can find all your current information in the game at my sGonks
            page. This includes your current trend buck, your initial worth,
            your google search investments and it’s current value.
          </li>
          <li>
            You can find Google searches to invest in at sGonks Market page.
          </li>
          <li>
            To see your ranking in your team and information about your
            teammates, go to the Competition page.
          </li>
        </ol>
      </div>
      <div className={classes.BackButton}>
        <LinkButton inverted="true"> Back </LinkButton>
      </div>
    </div>
  );
};

export default Explanation;
