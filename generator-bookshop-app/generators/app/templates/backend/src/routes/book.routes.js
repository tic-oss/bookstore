const express = require("express");
const bookRoute = express.Router();
const bookController = require("../controller/bookController");

bookRoute.route("/add-book").post(bookController.addBook);
bookRoute.route("/").get(bookController.getAllBooks);
bookRoute.route("/read-book/:id").get(bookController.readBook);
bookRoute.route("/update-book/:id").put(bookController.updateBook);
bookRoute.route("/delete-book/:id").delete(bookController.deleteBook);
bookRoute.get("/books/availability", bookController.getBooksAvailability);

module.exports = bookRoute;
