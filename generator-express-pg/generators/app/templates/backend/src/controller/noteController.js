const pool = require("../database/db.js");
const { connectToRabbitMQ } = require("../config/rabbitmq-config.js");

const sendMessageToQueue = async (queueTitle, message, postData) => {
  try {
    console.log("Data being sent to RabbitMQ queue:", postData);
    const { channel } = await connectToRabbitMQ();
    channel.assertQueue(queueTitle, { durable: false });
    channel.sendToQueue(queueTitle, Buffer.from(JSON.stringify(message)));
    console.log(`Message sent to RabbitMQ in queue: ${queuetitle}`);
  } catch (error) {
    console.error("Error sending message to RabbitMQ:", error);
  }
};

exports.addNote = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ message: "Title field is required" });
    }
    const query = {
      text: "INSERT INTO note (title, description) VALUES ($1, $2) RETURNING *",
      values: [title, description]
    };
    const result = await pool.query(query);
    sendMessageToQueue(
      "notesQueue",
      {
        action: "add",
        note: result.rows[0]
      },
      { title, description }
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding note:", error);
    next(error);
  }
};

exports.getAllNotes = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM note");
    console.log("All notes retrieved successfully");
    {
      sendMessageToQueue("notesQueue", {
        action: "getAll",
        note: result.rows[0]
      });
    }
    res.json(result.rows);
  } catch (error) {
    console.error("Error getting all notes:", error);
    next(error);
  }
};

exports.getNoteById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM note WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      console.log("Note not found");
      res.status(404).json({ message: "Note not found" });
    } else {
      console.log("Note retrieved successfully");
      sendMessageToQueue("notesQueue", {
        action: "get",
        note: result.rows[0]
      });
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error getting note by ID:", error);
    next(error);
  }
};

exports.updateNote = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ message: "Title field is required" });
    }
    const query = {
      text:
        "UPDATE note SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      values: [title, description, id]
    };
    const result = await pool.query(query);
    if (result.rows.length === 0) {
      console.log("Note not found");
      res.status(404).json({ message: "Note not found" });
    } else {
      console.log("Note updated successfully");
      sendMessageToQueue("notesQueue", {
        action: "update",
        noteId: id,
        newData: result.rows[0]
      });
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error updating note:", error);
    next(error);
  }
};

exports.deleteNote = async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM note WHERE id = $1", [id]);
    console.log("Note deleted successfully");
    sendMessageToQueue("notesQueue", {
      action: "delete",
      noteId: id
    });
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting note:", error);
    next(error);
  }
};
