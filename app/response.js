const { createSenderAction, createMessageData, createAttachmentMessage } = require('../lib/facebook/send-api').objects;
const { callSendAPI } = require('../lib/facebook/send-api').request;
const { SENDER_ACTION, ATTACHMENT } = require('../lib/facebook/send-api').constants;

const acknowledgeMessage = (recipientId) => {
  const senderActions = [];

  const markSeen = createSenderAction(recipientId, SENDER_ACTION.MARK_SEEN);
  const typingOn = createSenderAction(recipientId, SENDER_ACTION.TYPING_ON);
  senderActions.push(markSeen);
  senderActions.push(typingOn);

  senderActions.forEach((action) => {
    console.log('Calling send API with: ', action);
    callSendAPI(action);
  });
};

const sendMessage = (recipientId, message) => {
  const messageData = createMessageData(recipientId, message);
  console.log(`Calling Send API with: ${JSON.stringify(messageData)}`);
  callSendAPI(messageData);
};

const sendImage = (recipientId, url) => {
  const attachment = createAttachmentMessage(url, ATTACHMENT.IMAGE);
  const messageData = createMessageData(recipientId, attachment);
  callSendAPI(messageData);
}

const turnTypingOff = (recipientId) => {
  const typingOff = createSenderAction(recipientId, SENDER_ACTION.TYPING_OFF);
  console.log('Calling send API with: ', typingOff);
  callSendAPI(typingOff);
};

module.exports = {
  acknowledgeMessage,
  sendMessage,
  turnTypingOff,
  sendImage,
}
