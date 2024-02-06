const express = require("express");
const eventRoute = express.Router();
const eventController = require("../controller/eventController");

eventRoute.route("/add-event").post(eventController.addEvent);
eventRoute.route("/").get(eventController.getAllEvents);
eventRoute.route("/read-event/:id").get(eventController.readEvent);
eventRoute.route("/update-event/:id").put(eventController.updateEvent);
eventRoute.route("/delete-event/:id").delete(eventController.deleteEvent);

module.exports = eventRoute;
