const request = require('request');
const { PAGE_ACCESS_TOKEN } = require('../../../config').facebook.sendAPI;

const callSendAPI = (messageData) => {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData
  }, (err, res, body) => {
    if (!err && res.statusCode == 200) {
      const recipientId = body.recipient_id;
      const messageId = body.message_id;

      if (messageId) {
        console.log(`Successfully sent message with id ${messageId} to recipient ${recipientId}`);
      }
    } else {
      console.error('Unable to send message.');
      console.error(err);
    };
  });
};

module.exports = {
  callSendAPI,
};
