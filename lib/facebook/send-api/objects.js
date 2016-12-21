const logger = require('../../simple-logger');
const CONSTANTS = require('./constants');

const BUTTON = CONSTANTS.BUTTON;
const TEMPLATE = CONSTANTS.TEMPLATE;
const ATTACHMENT = CONSTANTS.ATTACHMENT;

const createMessageData = (recipientId, message) => {
  return {
    recipient: {
      id: recipientId,
    },
    message,
  };
};

const createSenderAction = (recipientId, senderAction) => {
  return {
    recipient: {
      id: recipientId,
    },
    sender_action: senderAction,
  };
}

// Sends back an object (message) with text only
const createTextMessage = (text) => {
  return {
    text,
  };
};

// Returns a button with a postback payload or a url
// depending on its type
const createButton = (type, title, urlOrPayload) => {
  if (type === BUTTON.POSTBACK) {
    return {
      type,
      title,
      payload: urlOrPayload,
    };
  } else if (type === BUTTON.URL) {
    return {
      type,
      title,
      url: urlOrPayload,
    };
  }
  logger.warn('Button type unspecified');
  return null;
};

// Sends back a Send API quick reply object,
// needs a title and payload to create one.
const createQuickReply = (title, payload) => {
  return {
    content_type: 'text',
    title,
    payload,
  };
};

// Creates a Send API element that may be used alone or with more
// elements in an array to populate a template in an attachment message type.
const createElement = (title, itemURL, imageURL, subtitle, buttons) => {
  return {
    title,
    image_url: imageURL,
    subtitle,
    item_url: itemURL,
    buttons,
  };
};

// Creates a quick_replies message using an array of quick replies,
// and a string of text supplied.
const createQuickReplyMessage = (text, quickReplies) => {
  return {
    text,
    quick_replies: quickReplies,
  };
};

// Creates a template object based on the type given
// populates the buttons or elements with each accordingly;
// if no type is given, defaults to a generic template for quick/ease of use.
const createTemplate = (buttonsOrElements, text, templateType = TEMPLATE.GENERIC) => {
  switch (templateType) {
    case TEMPLATE.GENERIC:
      return {
        template_type: templateType,
        elements: buttonsOrElements,
      };
    case TEMPLATE.BUTTON:
      return {
        template_type: templateType,
        text,
        buttons: buttonsOrElements,
      };
    default:
  }
};

// Creates a Send API attachment message type with a given payload;
// defaults to a template type attachment message if no types given.
const createAttachmentMessage = (payloadOrUrl, type = ATTACHMENT.TEMPLATE) => {
  if (type === ATTACHMENT.IMAGE || type === ATTACHMENT.VIDEO || type === ATTACHMENT.FILE || type === ATTACHMENT.AUDIO) {
    return {
      attachment: {
        type,
        payload: {
          url: payloadOrUrl,
        },
      },
    }
  };
  return {
    attachment: {
      type,
      payload: payloadOrUrl,
    },
  };
};

module.exports = {
  TEMPLATE,
  ATTACHMENT,
  BUTTON,
  createButton,
  createElement,
  createTemplate,
  createQuickReply,
  createQuickReplyMessage,
  createTextMessage,
  createAttachmentMessage,
  createMessageData,
  createSenderAction,
};
