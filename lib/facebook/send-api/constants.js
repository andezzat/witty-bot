// Declaring constants of types used by Send API objects.
const TEMPLATE = {
  BUTTON: 'button',
  GENERIC: 'generic',
};

const BUTTON = {
  POSTBACK: 'postback',
  URL: 'web_url',
};

const ATTACHMENT = {
  TEMPLATE: 'template',
  AUDIO: 'audio',
  VIDEO: 'video',
  FILE: 'file',
  IMAGE: 'image',
};

const SENDER_ACTION = {
  MARK_SEEN: 'mark_seen',
  TYPING_ON: 'typing_on',
  TYPING_OFF: 'typing_off',
};

module.exports = {
  TEMPLATE,
  BUTTON,
  ATTACHMENT,
  SENDER_ACTION,
};
