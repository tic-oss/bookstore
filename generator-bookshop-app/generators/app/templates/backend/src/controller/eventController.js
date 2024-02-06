const Event = require("../model/Event");

exports.addEvent = async (req, res, next) => {
  try {
    const data = await Event.create(req.body);
    res.json(data);
    console.log("Event added successfully");
  } catch (error) {
    next(error);
  }
};

exports.getAllEvents = async (req, res, next) => {
  try {
    const data = await Event.find();
    res.json(data);
    console.log("All events retrieved successfully");
  } catch (error) {
    next(error);
  }
};

exports.readEvent = async (req, res, next) => {
  try {
    const data = await Event.findById(req.params.id);
    res.json(data);
    console.log("Event retrieved successfully");
  } catch (error) {
    next(error);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const data = await Event.findByIdAndUpdate(req.params.id, {
      $set: req.body
    });
    res.json(data);
    console.log("Event updated successfully");
  } catch (error) {
    next(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const data = await Event.findByIdAndRemove(req.params.id);
    res.json(data);
    console.log("Event deleted successfully");
  } catch (error) {
    next(error);
  }
};
