const _ = require('lodash');
const { FEELINGS } = require('./constants');

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

const loopThroughEntities = (entities, func, object) => {
  let result;

  _.forOwn(entities, (value, key) => {
    if (key !== 'intent') {
      result = func(key, object);
    }
  });

  return result;
}

const convertFeeling = (feeling, object) => {
  let result;

  _.forOwn(FEELINGS, (value, key) => {
    if (feeling === value) {
      result = _.sample(object[FEELINGS[key]]);
    }
  });

  if (!result) {
    result = _.sample(object[FEELINGS.UNKNOWN]);
  }

  return result;
};

module.exports = {
  loopThroughEvents,
  loopThroughEntities,
  convertFeeling,
}
