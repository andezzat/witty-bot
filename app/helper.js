const _ = require('lodash');
const { FEELINGS, MOOD_LIMITS } = require('./constants');

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

const convertScoreToFeeling = (score, type, feelings) => {
  if (score >= type[feelings.high]) {
    return feelings.high;
  } else if (score <= type[feelings.low]) {
    return feelings.low;
  } else if (feelings.neutral) {
    return feelings.neutral;
  }
}

const getNewHappiness = (feeling, happiness) => {
  console.log('Happiness is ', happiness, 'and feeling is: ', feeling);
  if (happiness <= MOOD_LIMITS.HAPPINESS.MAX && happiness >= MOOD_LIMITS.HAPPINESS.MIN) {
    if (feeling === FEELINGS.POSITIVE) {
      return happiness + 1;
    } else if (feeling === FEELINGS.NEGATIVE) {
      return happiness - 1;
    }
  } else {
    return happiness;
  }
};

module.exports = {
  loopThroughEvents,
  loopThroughEntities,
  convertFeeling,
  getNewHappiness,
  convertScoreToFeeling,
}
