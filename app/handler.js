const response = require('./response');
const { createTextMessage } = require('../lib/facebook/send-api').objects;

const eventHandler = (event) => {
  if (event.message) {
    return receivedMessage(event);
  } else if (event.postback) {
    return receievedPostback(event);
  } else {
    console.log("Webhook received unknown event: ", event);
  }
};

const receivedMessage = (event) => {
  const recipientId = event.sender.id;
  const incomingMessage = event.message;

  response.acknowledgeMessage(recipientId);
  console.log("Message data: ", incomingMessage);
  const outgoingMessage = createTextMessage(incomingMessage.text); // Outgoing message is just an echo of the Incoming message
  response.sendMessage(recipientId, outgoingMessage);
  response.turnTypingOff(recipientId);
};

const receivedPostback = (event) => {
  console.log("Postback data: ", event.postback);
}

module.exports = {
  eventHandler,
};
