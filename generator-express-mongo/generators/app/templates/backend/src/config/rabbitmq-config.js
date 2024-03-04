const amqp = require("amqplib/callback_api");
require("dotenv").config();

const RABBIT_USER = process.env.RABBIT_USER;
const RABBIT_PS = process.env.RABBIT_PS;
const HOST_NAME = process.env.HOST_NAME;
const RUNNING_PORT = process.env.RUNNING_PORT;
const QUEUE_NAME = process.env.QUEUE_NAME;

const connectToRabbitMQAndConsume = () => {
  amqp.connect(`amqp://${RABBIT_USER}:${RABBIT_PS}@${HOST_NAME}:${RUNNING_PORT}`, (connectionError, connection) => {
    if (connectionError) {
      console.error("Error connecting to RabbitMQ:", connectionError);
      return;
    }

    connection.createChannel((channelError, channel) => {
      if (channelError) {
        console.error("Error creating channel:", channelError);
        return;
      }

      channel.assertQueue(QUEUE_NAME, { durable: false });

      console.log("Waiting for messages in queue:", QUEUE_NAME);
      channel.consume(QUEUE_NAME, (message) => {
        console.log("Received message:", message.content.toString());
      }, { noAck: true }); 

      console.log("Consumer started...");
    });
  });
};

connectToRabbitMQAndConsume();
