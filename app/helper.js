const _ = require('lodash');
const { GIF_QUERIES, FEELINGS, ACKNOWLEDGING_PHRASES } = require('./constants');

const loopThroughEvents = (req, execute) => {
  const data = req.body;

  if (data.object === 'page') {
    data.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        execute(event);
      });
    });
  }
};

const convertFeelingToGifQuery = (feeling) => {
  let query;

  _.forOwn(FEELINGS, (value, key) => {
    if (feeling === value) {
      query = _.sample(GIF_QUERIES[FEELINGS[key]]);
    }
  });

  if (!query) {
    query = _.sample(GIF_QUERIES[FEELINGS.UNKNOWN]);
  }

  return query;
};

const convertFeelingToAcknowledgement = (feeling) => {
  let acknowledgement;

  _.forOwn(FEELINGS, (value, key) => {
    if (feeling === value) {
      acknowledgement = _.sample(ACKNOWLEDGING_PHRASES[FEELINGS[key]]);
    }
  });

  if (!acknowledgement) {
    acknowledgement = _.sample(ACKNOWLEDGING_PHRASES[FEELINGS.UNKNOWN]);
  }

  return acknowledgement;
}

module.exports = {
  loopThroughEvents,
  convertFeelingToGifQuery,
  convertFeelingToAcknowledgement
}
