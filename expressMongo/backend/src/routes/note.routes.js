const express = require("express");
const noteRoute = express.Router();
const noteController = require("../controller/noteController");

noteRoute.route("/add-note").post(noteController.addnote);
noteRoute.route("/").get(noteController.getAllnotes);
noteRoute.route("/read-note/:id").get(noteController.getNoteById);
noteRoute.route("/update-note/:id").put(noteController.updatenote);
noteRoute.route("/delete-note/:id").delete(noteController.deletenote);

module.exports = noteRoute;
