# SGONKS - Trading Game

sGonks is a virtual trading game created for a 2020-2021 Google STEP internship Capstone project by @emmahogan, @phoebek and @mercurylin. It is built on a React frontend and a predominantly Java backend.

sGonks is deployed internally at https://sgonks-step272.googleplex.com/.

## Table of Contents

- [About the Project](#general-info)
- [How to play the game](#game-instructions)
- [Setup](#setup)

<a name="general-info"></a>

# About the project

This project is designed to get Googlers connect in a fun and exciting way using Google Search Trends.
The game is based on virtual trading platforms, but instead of investing in stocks, the player can invest “Trend Bucks” in a Google search query. By buying into a search at a given point in time, players can cash out later and earn or lose “Trend Bucks" based on increased or decreased global interest in that query, as indicated by Google trends data. This provides an interactive way for teams to compete with one another to predict search trends overtime.

<a name="game-instructions"></a>

# How to play the game

1. Users log in via their Google accounts. On login, the user will see a scrolling screen of every competition they are currently competing in, and the option to create a new competition.
2. By clicking on a competition, the user is directed to a dashboard display for their performance within that game. Every user starts every competition with 500 trend bucks to invest. The aim of the game is to invest Google searches that you believe will increase in popularity and finish with the most trend bucks out of every competitor.
3. The 'My sGonks page' is where the user can find essential information about their investments.
   - Their their current networth, amount available for spending, and initial worth.
   - A list of their current investments, their net gain or loss since the date of investment, and the option to sell.
   - A graph displaying the value (popularity) of each of their investments over time.
4. Users can invest in Google search queries on the sGonks Market page.
   - By querying a search term in the textbox, users will see a graph displaying the recent popularity of that search.
   - If wanted, they can then choose an amount and make an investment. It will now appear on their dashboard and My sGonks pages.
5. On the 'Competition' page users can see their ranking in their team, details of the competition such as organiser, start date and end dates, as well as displays of how they have performed relative to other competitors.

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

## Setting the project up

There are a number of blank configuration files in this repository that must be filled out for the project to run, as well as other setup on the Google appengine.

### Appengine

The project must be set up on the Google appengine to link it to the databases, Firebase and APIs. Once setup, add the appengine project ID into the relevant section in the pom.xml file : https://github.com/googleinterns/sgonks/blob/config-templates/project/services/default/pom.xml.

### Databases

The project uses Cloud SQL and Cloud Datastore. After setting up a new database in Cloud SQL through the appengine and setting a password, this password must be added in the relevant section of the Config.java file : https://github.com/googleinterns/sgonks/blob/config-templates/project/services/default/src/main/java/com/google/sps/config/Config.java.

Add datastore to the project through the appengine, and set up credentials by following the instructions here : https://cloud.google.com/docs/authentication/production.

### Authentication

The project authenticates through Firebase. Set the project up on Firebase, and add the details of the config file here : https://github.com/googleinterns/sgonks/blob/config-templates/project/frontend/src/services/config/firebaseConfig.js.

### Python microservice and Cloud Function

The data retrieval from Google Trends is run on a cronjob daily through a microservice on the appengine named data_updater. Part of the script calls a servlet named ScheduledServlet.java, which requires a password to run. Choose a password, and add it to the relevant variable in both config.py (https://github.com/googleinterns/sgonks/blob/config-templates/project/services/data_updater/scripts/config.py) and Config.java (https://github.com/googleinterns/sgonks/blob/config-templates/project/services/default/src/main/java/com/google/sps/config/Config.java). Deploy the microservice by running

#### cd project/services/data_updater
#### gcloud app deploy

Then deploy the cronjob by running 

#### glcoud app deploy cron.yaml

Some data retrieval happens on the fly during game play. For these purposes Cloud Functions must be set up on the appengine. Create a function named getContextData, and add each of the files in the scripts directory of the data_updater microservice. The entry point should be called main.py, and be a replica of the file contained in the functions directory (https://github.com/googleinterns/sgonks/tree/config-templates/project/functions). Also add the requirements.txt file in the same directory.

## Running the project in development

Run the backend on port 8080:

#### `cd project/services/default`
#### `mvn package appengine:run`

Run the frontend on port 9000:

#### `cd project/frontend`

If node modules are not already installed, first run

#### `npm i`

With installed node modules, run

#### `npm run watch`

The project can be now be viewed at http://localhost:8080.

## Deploying the project

#### `cd project/frontend`

If node modules are not already installed, first run

#### `npm i`

With installed node modules, run

#### `yarn build --mode=production`

Then

#### `cd project/services/default`
#### `mvn package appengine:deploy`

To view the deployed project

#### `gcloud app browse`
