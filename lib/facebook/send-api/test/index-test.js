const assert = require('assert');
const _ = require('lodash');
const sendAPI = require('../index');
const BUTTON = require('../index').BUTTON;
const TEMPLATE = require('../index').TEMPLATE;
const ATTACHMENT = require('../index').ATTACHMENT;

describe('sendAPI:createTextMessage', () => {
  it('should return an object with one property named "text" that contains the text provided', () => {
    const newSendAPITextMsg = sendAPI.createTextMessage('Hello There MATE!!!');

    assert(newSendAPITextMsg.text === 'Hello There MATE!!!', true);
    assert((_.size(newSendAPITextMsg) === 1), true);
  });
});

describe('sendAPI:createButton', () => {
  it('should return an object with type "postback" and title & payload as specified', () => {
    const newPostbackButton = sendAPI.createButton(BUTTON.POSTBACK,
      'myPostbackButton',
      '10/10 would postback to AGAIN!');

    assert(newPostbackButton.type === 'postback', true);
    assert(newPostbackButton.title === 'myPostbackButton', true);
    assert(newPostbackButton.payload === '10/10 would postback to AGAIN!', true);
    assert((_.size(newPostbackButton) === 3), true);
  });
  it('should return an object with type "web_url" and title & payload as specified', () => {
    const newURLButton = sendAPI.createButton(BUTTON.URL,
      'myURLButton',
      'gr8 URL m8 I r8 8/8');

    assert(newURLButton.type === 'web_url', true);
    assert(newURLButton.title === 'myURLButton', true);
    assert(newURLButton.url === 'gr8 URL m8 I r8 8/8', true);
    assert((_.size(newURLButton) === 3), true);
  });
});

describe('sendAPI:createQuickReply', () => {
  it('should return an object with content_type "text" and title & payload as specified', () => {
    const newQuickReply = sendAPI.createQuickReply('myQuickReply',
      'not the best QuickReply in da werld m8..');

    assert(newQuickReply.content_type === 'text', true);
    assert(newQuickReply.title === 'myQuickReply', true);
    assert(newQuickReply.payload === 'not the best QuickReply in da werld m8..', true);
    assert((_.size(newQuickReply) === 3), true);
  });
});

describe('sendAPI:createElement', () => {
  it('should return an object with title, image_url, subtitle, item_url & buttons as specified', () => {
    const newPostbackButton = sendAPI.createButton(BUTTON.POSTBACK,
      'myPostbackButton',
      '10/10 would postback to AGAIN!');
    const newURLButton = sendAPI.createButton(BUTTON.URL,
      'myURLButton',
      'gr8 URL m8 I r8 8/8');

    const buttons = [
      newPostbackButton,
      newURLButton,
    ];
    const newElement = sendAPI.createElement(
      'myElement',
      'http://www.elements.com/areAwesome?query=512Elements/yay',
      'http://www.elements.com/areAwesome?query=512Elements/yay.jpg',
      'myElementSubtitle',
      buttons);

    assert(newElement.title === 'myElement', true);
    assert(newElement.image_url === 'http://www.elements.com/areAwesome?query=512Elements/yay.jpg', true);
    assert(newElement.subtitle === 'myElementSubtitle', true);
    assert(newElement.item_url === 'http://www.elements.com/areAwesome?query=512Elements/yay', true);
    assert(newElement.buttons === buttons, true);
    assert(newElement.buttons.length === buttons.length, true);
    assert((_.size(newElement) === 5), true);
  });
  it('should return an object with title, image_url, subtitle, & buttons as specified but with an undefined item_url', () => {
    const newPostbackButton = sendAPI.createButton(BUTTON.POSTBACK,
      'myPostbackButton',
      '10/10 would postback to AGAIN!');
    const newURLButton = sendAPI.createButton(BUTTON.URL,
      'myURLButton',
      'gr8 URL m8 I r8 8/8');

    const buttons = [
      newPostbackButton,
      newURLButton,
    ];
    const newElement = sendAPI.createElement(
      'myElement',
      undefined,
      'http://www.elements.com/areAwesome?query=512Elements/yay.jpg',
      'myElementSubtitle',
      buttons);

    assert(newElement.title === 'myElement', true);
    assert(newElement.image_url === 'http://www.elements.com/areAwesome?query=512Elements/yay.jpg', true);
    assert(newElement.subtitle === 'myElementSubtitle', true);
    assert(newElement.item_url === undefined, true);
    assert(newElement.buttons === buttons, true);
    assert(newElement.buttons.length === buttons.length, true);
    assert((_.size(newElement) === 5), true);
  });
});

describe('sendAPI:createQuickReplyMessage', () => {
  it('should return an object with text and quick_replies as specified', () => {
    const newQuickReply = sendAPI.createQuickReply('myQuickReply',
      'not the best QuickReply in da werld m8..');
    const newQuickReplyTwo = sendAPI.createQuickReply('myQuickReplyAyy',
      'maybe not the best QuickReply in da werld m8..');
    const newQuickReplyThree = sendAPI.createQuickReply('myQuickReplyNay',
      'Indeed the best QuickReply in da werld m8..');

    const quickReplies = [
      newQuickReply,
      newQuickReplyTwo,
      newQuickReplyThree,
    ];
    const newQuickReplyMessage = sendAPI.createQuickReplyMessage(
      'myQuickReplyMessage',
      quickReplies);

    assert(newQuickReplyMessage.text === 'myQuickReplyMessage', true);
    assert(_.size(newQuickReplyMessage) === 2, true);
    assert(newQuickReplyMessage.quick_replies.length === quickReplies.length, true);
  });
});

describe('sendAPI:createTemplate', () => {
  it('should return an object with template_type "generic", text as undefined and elements as specified', () => {
    const newPostbackButton = sendAPI.createButton(BUTTON.POSTBACK,
      'myPostbackButton',
      '10/10 would postback to AGAIN!');
    const newURLButton = sendAPI.createButton(BUTTON.URL,
      'myURLButton',
      'gr8 URL m8 I r8 8/8');

    const buttons = [
      newPostbackButton,
      newURLButton,
    ];
    const newElement = sendAPI.createElement(
      'myElement',
      'http://www.elements.com/areAwesome?query=512Elements/yay',
      'http://www.elements.com/areAwesome?query=512Elements/yay.jpg',
      'myElementSubtitle',
      buttons);
    const newElementNay = sendAPI.createElement(
      'myElementNay',
      'http://www.elements.com/areAwesome?query=512Elements/nay',
      'http://www.elements.com/areAwesome?query=512Elements/nay.jpg',
      'myElementNaySubtitle');

    const elements = [
      newElement,
      newElementNay,
    ];
    const newGenericTemplate = sendAPI.createTemplate(
      elements,
      undefined,
      TEMPLATE.GENERIC);

    assert(newGenericTemplate.text === undefined, true);
    assert(newGenericTemplate.template_type === 'generic', true);
    assert(_.size(newGenericTemplate) === 2, true);
    assert(newGenericTemplate.elements.length === elements.length, true);
    assert(newGenericTemplate.elements === elements, true);
  });
  it('should return an object with template_type "button" and text & buttons as specified', () => {
    const newPostbackButton = sendAPI.createButton(BUTTON.POSTBACK,
      'myPostbackButton',
      '10/10 would postback to AGAIN!');
    const newURLButton = sendAPI.createButton(BUTTON.URL,
      'myURLButton',
      'gr8 URL m8 I r8 8/8');

    const buttons = [
      newPostbackButton,
      newURLButton,
    ];

    const newButtonTemplate = sendAPI.createTemplate(
      buttons,
      'myButtonTemplate',
      TEMPLATE.BUTTON);

    assert(newButtonTemplate.text === 'myButtonTemplate', true);
    assert(newButtonTemplate.template_type === 'button', true);
    assert(_.size(newButtonTemplate) === 3, true);
    assert(newButtonTemplate.buttons.length === buttons.length, true);
    assert(newButtonTemplate.buttons === buttons, true);
  });
  it('should return an object with template_type "generic", text as undefined and elements as specified, despite not specifiying template type', () => {
    const newPostbackButton = sendAPI.createButton(BUTTON.POSTBACK,
      'myPostbackButton',
      '10/10 would postback to AGAIN!');
    const newURLButton = sendAPI.createButton(BUTTON.URL,
      'myURLButton',
      'gr8 URL m8 I r8 8/8');

    const buttons = [
      newPostbackButton,
      newURLButton,
    ];
    const newElement = sendAPI.createElement(
      'myElement',
      'http://www.elements.com/areAwesome?query=512Elements/yay',
      'http://www.elements.com/areAwesome?query=512Elements/yay.jpg',
      'myElementSubtitle',
      buttons);
    const newElementNay = sendAPI.createElement(
      'myElementNay',
      'http://www.elements.com/areAwesome?query=512Elements/nay',
      'http://www.elements.com/areAwesome?query=512Elements/nay.jpg',
      'myElementNaySubtitle');

    const elements = [
      newElement,
      newElementNay,
    ];
    const newGenericTemplate = sendAPI.createTemplate(
      elements);

    assert(newGenericTemplate.text === undefined, true);
    assert(newGenericTemplate.template_type === 'generic', true);
    assert(_.size(newGenericTemplate) === 2, true);
    assert(newGenericTemplate.elements.length === elements.length, true);
    assert(newGenericTemplate.elements === elements, true);
  });
});

describe('sendAPI:createAttachmentMessage', () => {
  it('should return an object with its attachment\'s: payload as specified and type as "template"', () => {
    const newPostbackButton = sendAPI.createButton(BUTTON.POSTBACK,
      'myPostbackButton',
      '10/10 would postback to AGAIN!');
    const newURLButton = sendAPI.createButton(BUTTON.URL,
      'myURLButton',
      'gr8 URL m8 I r8 8/8');

    const buttons = [
      newPostbackButton,
      newURLButton,
    ];
    const newElement = sendAPI.createElement(
      'myElement',
      'http://www.elements.com/areAwesome?query=512Elements/yay',
      'http://www.elements.com/areAwesome?query=512Elements/yay.jpg',
      'myElementSubtitle',
      buttons);
    const newElementNay = sendAPI.createElement(
      'myElementNay',
      'http://www.elements.com/areAwesome?query=512Elements/nay',
      'http://www.elements.com/areAwesome?query=512Elements/nay.jpg',
      'myElementNaySubtitle');

    const elements = [
      newElement,
      newElementNay,
    ];
    const newGenericTemplate = sendAPI.createTemplate(
      elements);

    const newAttachmentMessage = sendAPI.createAttachmentMessage(newGenericTemplate, ATTACHMENT.TEMPLATE);

    assert(newAttachmentMessage.attachment.type === 'template', true);
    assert(_.size(newAttachmentMessage.attachment) === 2, true);
    assert(_.size(newAttachmentMessage) === 1, true);
    assert(newAttachmentMessage.attachment.payload === newGenericTemplate, true);
  });
  it('should return an object with its attachment\'s payload: as undefined and type as "template" despite not supplying a templateType', () => {
    const newPostbackButton = sendAPI.createButton(BUTTON.POSTBACK,
      'myPostbackButton',
      '10/10 would postback to AGAIN!');
    const newURLButton = sendAPI.createButton(BUTTON.URL,
      'myURLButton',
      'gr8 URL m8 I r8 8/8');

    const buttons = [
      newPostbackButton,
      newURLButton,
    ];
    const newElement = sendAPI.createElement(
      'myElement',
      'http://www.elements.com/areAwesome?query=512Elements/yay',
      'http://www.elements.com/areAwesome?query=512Elements/yay.jpg',
      'myElementSubtitle',
      buttons);
    const newElementNay = sendAPI.createElement(
      'myElementNay',
      'http://www.elements.com/areAwesome?query=512Elements/nay',
      'http://www.elements.com/areAwesome?query=512Elements/nay.jpg',
      'myElementNaySubtitle');

    const elements = [
      newElement,
      newElementNay,
    ];
    const newGenericTemplate = sendAPI.createTemplate(
      elements);

    const newAttachmentMessage = sendAPI.createAttachmentMessage(newGenericTemplate);

    assert(newAttachmentMessage.attachment.type === 'template', true);
    assert(_.size(newAttachmentMessage.attachment) === 2, true);
    assert(_.size(newAttachmentMessage) === 1, true);
    assert(newAttachmentMessage.attachment.payload === newGenericTemplate, true);
  });
});
