const Keycloak = require("keycloak-connect");
const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const createError = require("http-errors");
const { runMigrateMongo } = require("./src/dbmigration/migrate.js");
const keycloakConfig = require("./src/config/keycloak-config.js")
  .keycloakConfig;
const app = express();
const bookRoute = require("./src/routes/book.routes.js");
const eventRoute = require("./src/routes/event.routes.js");

const mongoDb = require("./src/database/db.js");

const memoryStore = new session.MemoryStore();

app.use(
  session({
    secret: "QsP2#vR7!",
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  })
);

const keycloak = new Keycloak(
  {
    store: memoryStore
  },
  keycloakConfig
);

app.use(keycloak.middleware());

mongoose.Promise = global.Promise;
mongoose
  .connect(mongoDb.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log("Connected to the database");

    await runMigrateMongo();
  })
  .catch(error => {
    console.error("Could not connect" + error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "*");
  next();
});

app.use(express.static(path.join(__dirname, "dist/Bookstore")));
app.use("/api", keycloak.protect(), bookRoute);
app.use("/alert", eventRoute);

const port = `<%= portNumber %>`;
app.listen(port, () => {
  console.log("Listening on Port: " + port);
});

app.use((_req, _res, next) => {
  next(createError(404));
});

app.use(function(err, req, res, _next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
