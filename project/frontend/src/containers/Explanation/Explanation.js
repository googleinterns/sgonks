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
            You can find all the competitions you're competing in, or create a
            competition on the competition page.
          </li>
          <li>
            The aim of the game is to invest in Google Search queries that you
            think are going to increase in popularity over the duration of the
            competition, and sell these queries at a profit to get the most
            Trend Bucks by the competition end date.
          </li>
          <li>
            You receive and lose Trend Bucks based on how many you invested in
            the query, and the proportional change in popularity of the query
            since you invested. For instance, if you invest 100 Trend Bucks in a
            query that doubles in popularity by the time you sell, you cash out
            with 200 Trend Bucks, and 100 Trend Buck profit.
          </li>
          <li>
            You can find all your current information for the game at the My
            sGonks page. This includes your current net worth in Trend Bucks
            across your investments, the amount you have available to spend, and
            a summary of your current investments and their values.
          </li>
          <li>
            You can find Google searches to invest in at the sGonks Market page.
          </li>
          <li>
            To see your ranking and information about the performance of other
            competitors, go to the Competition page.
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
