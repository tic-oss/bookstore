const express = require("express");
const Keycloak = require("keycloak-connect");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const createError = require("http-errors");
const keycloakConfig =
  require("./src/config/keycloak-config.js").keycloakConfig;
const app = express();
const noteRoute = require("./src/routes/note.routes.js");
const mongoDb = require("./src/database/db.js");
const memoryStore = new session.MemoryStore();

app.use(
  session({
    secret: "QsP2#vR7!",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

const keycloak = new Keycloak(
  {
    store: memoryStore,
  },
  keycloakConfig
);

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((_req, res, next) => {
  res.header("Access-Control-Expose-Headers", "*");
  next();
});

app.use(express.static(path.join(__dirname, "dist/Notes")));

app.use(keycloak.middleware());

app.use("/note", keycloak.protect(), noteRoute);

const port =`<%= portNumber %>`;
app.listen(port, () => {
  console.log("Listening on Port: " + port);
});

app.use((_req, _res, next) => {
  next(createError(404));
});

app.use(function (err, _req, res, _next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
