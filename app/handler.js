const response = require('./response');
const { createTextMessage } = require('../lib/facebook/send-api').objects;
const { wit, findOrCreateSession, getSessions } = require('./wit');

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
  const sessionId = findOrCreateSession(recipientId);
  const sessions = getSessions();
  const message = event.message;
  const text = message.text;

  response.acknowledgeMessage(recipientId);
  console.log("Message data: ", message);

  // Tell wit to process the message recieved and run all actions that need to be run.
  wit.runActions(
    sessionId,
    text,
    sessions[sessionId].context
  ).then((context) => {
    // If the context is done, delete this session. Aka: request has been fulfilled and context is now irrelevant to the flow of conversation.
    if (context['done']) {
      delete sessions[sessionId];
    }
    // Update the context after all actions are run
    sessions[sessionId].context = context;
  }).catch((err) => {
    // Catch any errors in the process
    console.error('Oops! Wit came back with an error: ', err.stack || err);
  });

};

const receivedPostback = (event) => {
  console.log("Postback data: ", event.postback);
}

module.exports = {
  eventHandler,
};
