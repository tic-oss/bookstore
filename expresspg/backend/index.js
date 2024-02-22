const express = require("express");
const bodyParser = require("body-parser");
const Keycloak = require("keycloak-connect");
const session = require("express-session");
const cors = require("cors");
const keycloakConfig = require("./src/config/keycloak-config.js");
const noteRoutes = require("./src/routes/noteRoutes.js");
const { connectToRabbitMQ } = require("./src/config/rabbitmq-config.js");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
  })
);

const keycloak = new Keycloak(keycloakConfig, connectToRabbitMQ);

app.use(keycloak.middleware());

app.use("/api", noteRoutes);

const port = 3000;
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
