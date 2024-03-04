const express = require("express");
const noteRoute = express.Router();
const noteController = require("../controller/noteController.js");

noteRoute.route("/add-note").post(noteController.addNote);
noteRoute.route("/").get(noteController.getAllNotes);
noteRoute.route("/read-note/:id").get(noteController.getNoteById);
noteRoute.route("/update-note/:id").put(noteController.updateNote);
noteRoute.route("/delete-note/:id").delete(noteController.deleteNote);

module.exports = noteRoute;
