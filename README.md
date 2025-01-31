# Northcoders News API

The test and development enviornments for this project are not accessable through this repo, and must instead be created by the user in order to connect to the database:

.env.development
.env.test

with the relevant databases to connect to located in the setup.sql root file.


The hosted version is located here: https://gawendas-gossip.onrender.com
This project is my first approach to the viewing and manipulation of an object based database. There are articles, comments, users and topics that can all be found and manipulated. This is currently only a backend project, with very little user friendly adjustments

To seed, scripts "seed" and "seed-test" are available. 
developed with postgress version "8.7.3" 
developed with node.js version "23.2/0"

.env.development and .env.test files are needed to test and develop this project, with PGDATABASE seet to nc_news and nc_news_test respectively

All current endpoints can be found in the endpoints.json file or at file path /api
--- 

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
