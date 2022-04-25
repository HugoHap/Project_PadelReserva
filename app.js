require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();


require("./config")(app);
require("./config/session.config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "PadelReserva";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/perfil", userRoutes);

require("./error-handling")(app);

module.exports = app;
