const amqp = require("amqplib/callback_api");
require("dotenv").config();

const RABBIT_USER = process.env.RABBIT_USER;
const RABBIT_PS = process.env.RABBIT_PS;
const HOST_NAME = process.env.HOST_NAME;
const RUNNING_PORT = process.env.RUNNING_PORT;
const QUEUE_NAME = 'notesQueue';

const connectToRabbitMQ = () => {
  return new Promise((resolve, reject) => {
    amqp.connect(`amqp://${RABBIT_USER}:${RABBIT_PS}@${HOST_NAME}:${RUNNING_PORT}`, (connectionError, connection) => {
      if (connectionError) {
        reject(`Error connecting to RabbitMQ: ${connectionError}`);
      }
      else {
        connection.createChannel((channelError, channel) => {
          if (channelError) {
            reject(`Error creating channel: ${channelError}`);
          } 
          else {
            channel.assertQueue(QUEUE_NAME, { durable: false }, (queueError, ok) => {
              if (queueError) {
                reject(`Error declaring queue: ${queueError}`);
              } 
              else {
                console.log(`Queue '${QUEUE_NAME}' created successfully.`);
                resolve({ connection, channel });
              }
            });
          }
        });
      }
    });
  });
};

module.exports = { connectToRabbitMQ };
