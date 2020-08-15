
# Intro
This is a full stack application that allows users to search up League of Legends players' statistics, and displays them in an elegant and readable format.
Players may enter a valid username and find interesting statistics about matches they recently played, including kills, deaths, assists, items purchased, match length, and much more.

# Technical
This full stack app uses the MERN stack to accomplish an efficient data retrieval. I built the frontend using React as well as a few minor extensions including React-Bootstrap and Axios. I used resources provided by Riot Games' "data dragon" service to display the exact resources as the ones in the actual videogame. I used React-Bootstrap for styling/layout /purposes (makes it easier for React devs to design UI using bootstrap tools as JSX components), and Axios to make API calls that are browser/backwards compatible.

I used AWS Lambda and API Gateway together to create a serverless API proxy, in order to bypass CORS policy. I did this by creating a number of Lambda functions, which would make API calls to the Riot Games server whenever triggered by its corresponding API Gateway endpoint.

Since I was only provided a heavily rate-limited developer key by Riot Games, I worried alot about efficiency, as I would quickly reach my rate limit if I made the required 7-10 separate API calls to Riot Games per user lookup. To prevent this, I created a backend server-and-database using Express/NodeJS, Mongoose and MongoDB Atlas that is capable of storing and finding games that have already been looked up. If a player looks themselves up a second time, my frontend FIRST checks the database for existing games, before making the remaining necessary calls to the actual Riot Games server. The usage of a match-storing database eased rate-limiting by at least 50% and up to 500% depending on the number of concurrent players searching up the same match using my service.

