# SGONKS - Trading Game

SGONKS is a trading game created with Node.js with a java backend. SGONKS is a 2020 STEP Capstone project by @emmahogan, @phoebek and @mercurylin.

## Table of Contents

- [About the Project](#general-info)
- [How to play the game](#game-instructions)
- [Setup](#setup)

<a name="general-info"></a>

# About the project

This project is design to get Googlers connect in a fun and exciting way by using Google Search Trends.
The project will work along similar ideas to virtual trading platforms, but instead of investing in stocks, the player can invest “Trend Bucks” in a Google search query. By buying into a search at a given point in time, they can cash out later and earn or lose “Trend Bucks" based on increased or decreased global interest in that query, as indicated by Google trends data. This provides an interactive way for teams to compete with one another to predict search trends overtime.

<a name="game-instructions"></a>

# How to play the game

1. Everyone in this game will be in a competition that is created by an organiser. User can be in more than one competition.
2. The aim of the game is to invest in the Google Search that you think is going to be trending and end up with the most trend bucks at the end of the competition.
3. My sGonks page is where the user can find their current information.
   - Their current trends buck and initial worth.
   - Their search query stocks that they brought with current value and invested value.
   - The graph displaying the search trends of their stocks.
4. Users can invest in the Google search query at the sGonks Market page.
   - User will be able to search up the search query they want to invest in and see a graph displaying how much it's worth through out the year.
   - If they decide to purchase this search qurey they can put in the about they want to invest in and purchase it.
5. The competition page is where the user can see their ranking in their team. This page will diplays the competitions details and current rank of everyone in that competition.

<a name="setup"></a>

# Setup

## Dependencies

To run this project, you will need to have installed:

 - Java 8
 - Python 3
 - Pytrends API
 - Pandas library
 - Maven
 - node
 - Google Cloud SDK

## Running the project in development

TBC

## Deploying the project

#### `cd project/frontend`

If node modules are not already installed, first run

#### `npm i`

With installed node modules, run

#### `yarn build --mode=production`

Then

#### `cd ..`
#### `mvn package appengine:deploy`

To view the deployed project

#### `gcloud app browse`