require("dotenv/config");

require("./db");

const express = require("express");

const app = express();

require("./config")(app);
require("./config/session.config")(app);

const projectName = "PadelReserva";

app.locals.appTitle = projectName

require('./routes')(app)

require("./error-handling")(app);

module.exports = app;
