// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/back-end-razzed";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

// // Languages for the DB

// const Languages = require('../models/Language.model');

// const languagesCodes = [
//   {lang: 'ES'},
//   {lang: 'PT'},
//   {lang: 'EN'},
//   {lang: 'FR'},
//   {lang: 'DE'},
//   {lang: 'IT'},
//   {lang: 'NL'},
//   {lang: 'JA'},
//   {lang: 'ZH'},
//   {lang: 'RU'},
// ];

// Languages.insertMany(languagesCodes).then( langs => {
//   console.log(`${langs} languages created`);
// })

// const typesOfTour = require('../models/TourTypes.model');

// const theseTourTypes = [
//   {name: 'HD'},
//   {name: 'FD'},
//   {name: 'Circuit'}
// ];

// typesOfTour.insertMany(theseTourTypes).then( tours => {
//   console.log(tours);
// })