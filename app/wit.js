const Wit = require('node-wit').Wit;
const log = require('node-wit').log;
const response = require('./response');
const logic = require('./logic');

const { WIT_SERVER_ACCESS_TOKEN } = require('../config');

const sessions = {};

const actions = {
  send({ sessionId }, { text }) {
    const recipientId = sessions[sessionId].fbid;
    if (recipientId) {
      receivedBotResponse(recipientId, text);
      return Promise.resolve();
    }
  },
  getAllShows({ sessionId, context, text, entities }) {
    return new Promise((resolve, reject) => {
      logic.getAllShows().then((shows) => {
        context.shows = shows;
        resolve(context);
      }).catch((err) => {
        context.error = err;
        resolve(context);
      });
    });
  },
  clearContext({ sessionId, context }) {
    return new Promise((resolve, reject) => {
      context.done = true;
      resolve(context);
    });
  },
};

const wit = new Wit({
  accessToken: WIT_SERVER_ACCESS_TOKEN,
  actions,
  logger: new log.Logger(log.INFO),
});


const findOrCreateSession = (fbid) => {
  let sessionId;

  Object.keys(sessions).forEach(k => {
    if (sessions[k].fbid === fbid) {
      sessionId = k;
    }
  });
  if (!sessionId) {
    sessionId = new Date().toISOString();
    sessions[sessionId] = { fbid: fbid, context: {} };
  }
  return sessionId;
};

const getSessions = () => {
  return sessions;
}

const receivedBotResponse = (recipientId, text) => {
  response.turnTypingOff(recipientId);
  response.sendMessage(recipientId, { text });
};

module.exports = {
  wit,
  findOrCreateSession,
  getSessions,
};
