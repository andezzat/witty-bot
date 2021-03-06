const _ = require('lodash');
const Sickrage = require('../lib/sickrage');
const Giphy = require('../lib/giphy-api');
const transform = require('./transform');
const { convertFeeling, loopThroughEntities, getNewHappiness, convertScoreToFeeling } = require('./helper');
const { FEELINGS, GIF_QUERIES, GREETINGS, ACKNOWLEDGING_PHRASES, MOOD_LIMITS, CURRENT_MOOD } = require('./constants');
const { scrape } = require('./scraper');
const CONTACTS = require('./contacts.json');
const { sendMessage } = require('./response');

const { SICKRAGE_API_TOKEN } = require('../config');

const mood = {};
mood.happiness = 0;

mood.currentHappiness = () => {
  const currentHappiness = convertScoreToFeeling(mood.happiness, MOOD_LIMITS.HAPPINESS, {
    high: FEELINGS.POSITIVE,
    low: FEELINGS.NEGATIVE,
    neutral: 'neutral',
  });

  return currentHappiness;
}

const sr = new Sickrage({
  server: '192.168.1.10',
  port: '8081',
  api_token: SICKRAGE_API_TOKEN,
});

const giphy = new Giphy();

const getAllShows = (opts) => {
  return new Promise((resolve, reject) => {
    sr.getAllShows().then((response) => {
      const shows = JSON.parse(response).data;
      const transformedShows = transform.allShows(shows);
      resolve(transformedShows);
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
};

const getYahooAuctions = () => {
  return new Promise((resolve, reject) => {
    scrape().then((response) => {
      const auctions = transform.allAuctions(response);
      console.log(auctions);
      resolve(auctions);
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
};

const alertUser = (response) => {
  const auctions = transform.allAuctions(response);
  sendMessage(CONTACTS[0].id, { text: auctions });
}

const getMood = () => {
  const currentMood = mood.currentHappiness();
  console.log(currentMood);
  const moodPhrases = CURRENT_MOOD[currentMood];

  return _.sample(moodPhrases);
};

const getGif = (entities) => {
  return new Promise((resolve, reject) => {
    let query;
    const search_query = _.get(entities, 'search_query[0].value');
    const intent = _.get(entities, 'intent[0].value');

    if (search_query && intent !== 'acknowledgeFeelings') {
      query = search_query;
    } else if (intent === 'acknowledgeFeelings') {
      query = loopThroughEntities(entities, convertFeeling, GIF_QUERIES);
    }

    console.log('\nAbout to look for Random Gif with query:', query);
    giphy.random({ tag: query }).then((res) => {
      resolve(res.data.image_url);
    }).catch((err) => {
      reject(err);
    });
  });
};

const getResponse = (entities) => {
  let response;
  const intent = _.get(entities, 'intent[0].value');

  switch (intent) {
    case 'acknowledgeFeelings':
      response = loopThroughEntities(entities, convertFeeling, ACKNOWLEDGING_PHRASES);
      break;
    case 'greeting':
      console.log('Current happiness: ', mood.happiness);
      if (mood.happiness >= MOOD_LIMITS.HAPPINESS[FEELINGS.POSITIVE]) {
        response = _.sample(GREETINGS[FEELINGS.POSITIVE]);
      } else if (mood.happiness <= MOOD_LIMITS.HAPPINESS[FEELINGS.NEGATIVE]) {
        response = _.sample(GREETINGS[FEELINGS.NEGATIVE]);
      } else {
        response = _.sample(GREETINGS[FEELINGS.NEUTRAL]);
      }
      break;
  }

  return response;
};

const updateMood = (entities) => {
  let feeling;

  _.forOwn(entities, (value, key) =>{
    if (_.includes(FEELINGS, key)) {
      feeling = key;
    }
  });

  switch (feeling) {
    case FEELINGS.POSITIVE:
    case FEELINGS.NEGATIVE:
        const newHappiness = getNewHappiness(feeling, mood.happiness);
        console.log('New Happiness: ', newHappiness);
        mood.happiness = newHappiness;
      break;
  }
};

module.exports = {
  getAllShows,
  getGif,
  getResponse,
  updateMood,
  getYahooAuctions,
  getMood,
  alertUser,
};
