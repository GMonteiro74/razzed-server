// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const session = require("express-session");
app.set('trust proxy', 1); // security requirements from Heroku
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      sameSite: 'none',// sameSite: true, //both fe and be are running on the same hostname
      httpOnly: false, 
      maxAge: 60000, 
      secure: true,
    },
    rolling: true,
  })
);
// default value for title local
const projectName = "Razzed";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const guides = require('./routes/guides');
app.use('/', guides);

const agencies = require('./routes/agency');
app.use('/', agencies);

const tours = require('./routes/tours');
app.use('/', tours);

const auth = require('./routes/auth');
app.use('/', auth)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
