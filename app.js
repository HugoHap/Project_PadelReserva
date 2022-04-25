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

const matchRoutes = require("./routes/match.routes");
app.use("/partidos", matchRoutes);

const clubRoutes = require("./routes/club.routes");
app.use("/clubs", clubRoutes);

const apiRouter = require('./routes/api.routes');
app.use('/api', apiRouter);

require("./error-handling")(app);

module.exports = app;
