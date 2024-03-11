const Note = require("../model/notes");
const { connectToRabbitMQ } = require("../config/rabbitmq-config.js");

// const sendMessageToQueue = async (queueName, message) => {
//   try {
//     const channel = await connectToRabbitMQ();
//     channel.assertQueue(queueName, { durable: false });
//     channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
//     console.log(`Message sent to RabbitMQ in queue: ${queueName}`);
//   } catch (error) {
//     console.error("Error sending message to RabbitMQ:", error);
//   }
// };

exports.addnote = async (req, res, next) => {
  try {
    const data = await Note.create(req.body);
    res.json(data);
    console.log("Note added successfully");
    sendMessageToQueue("notesQueue", {
      action: "add",
      note: data,
    });
  } catch (error) {
    console.error("Error adding note:", error);
    next(error);
  }
};

exports.getAllnotes = async (_req, res, next) => {
  try {
    const data = await Note.find();
    res.json(data);
    console.log("All notes retrieved successfully");
    sendMessageToQueue("notesQueue", {
      action: "getAll",
    });
  } catch (error) {
    console.error("Error getting all notes:", error);
    next(error);
  }
};

exports.getNoteById = async (req, res, next) => {
  try {
    const data = await Note.findById(req.params.id);
    res.json(data);
    console.log("Note retrieved successfully");
    sendMessageToQueue("notesQueue", {
      action: "read",
      noteId: req.params.id,
    });
  } catch (error) {
    console.error("Error getting note by ID:", error);
    next(error);
  }
};

exports.updatenote = async (req, res, next) => {
  try {
    const data = await Note.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.json(data);
    console.log("Note updated successfully");
    sendMessageToQueue("notesQueue", { 
      action: "update",
      noteId: req.params.id,
      newData: req.body,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    next(error);
  }
};

exports.deletenote = async (req, res, next) => {
  try {
    const data = await Note.findByIdAndRemove(req.params.id);
    res.json(data);
    console.log("Note deleted successfully");
    sendMessageToQueue("notesQueue", { 
      action: "delete",
      noteId: req.params.id,
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    next(error);
  }
};
