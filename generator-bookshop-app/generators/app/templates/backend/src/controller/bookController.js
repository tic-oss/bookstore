const Book = require("../model/Book");

exports.addBook = async (req, res, next) => {
  try {
    const data = await Book.create(req.body);
    res.json(data);
    console.log("Book added successfully");
  } catch (error) {
    next(error);
  }
};

exports.getAllBooks = async (req, res, next) => {
  try {
    const data = await Book.find();
    res.json(data);
    console.log("All books retrieved successfully");
  } catch (error) {
    next(error);
  }
};

exports.readBook = async (req, res, next) => {
  try {
    const data = await Book.findById(req.params.id);
    res.json(data);
    console.log("Book retrieved successfully");
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const data = await Book.findByIdAndUpdate(req.params.id, {
      $set: req.body
    });
    res.json(data);
    console.log("Book updated successfully");
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const data = await Book.findByIdAndRemove(req.params.id);
    res.json(data);
    console.log("Book deleted successfully");
  } catch (error) {
    next(error);
  }
};

exports.getBooksAvailability = async (req, res) => {
  try {
    const books = await Book.find({}, "title availability");
    res.status(200).json(books);
    console.log("Books availability retrieved successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json;
  }
};
