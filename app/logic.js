const _ = require('lodash');
const Sickrage = require('../lib/sickrage');
const Giphy = require('giphy-api');
const transform = require('./transform');
const { convertFeelingToGifQuery, convertFeelingToAcknowledgement } = require('./helper');
const { FEELINGS } = require('./constants');

const { SICKRAGE_API_TOKEN } = require('../config');

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

const getGif = (entities) => {
  return new Promise((resolve, reject) => {
    let query;
    const search_query = _.get(entities, 'search_query[0].value');
    const intent = _.get(entities, 'intent[0].value');

    if (search_query && intent !== 'acknowledgeFeelings') {
      query = search_query;
    } else if (intent === 'acknowledgeFeelings') {
      _.forOwn(entities, (value, key) => {
        if (key !== 'intent') {
          query = convertFeelingToGifQuery(key);
        }
      });
    }

    console.log('\nAbout to look for Random Gif with query:', query);
    giphy.random({ tag: query }).then((res) => {
      resolve(res.data.image_url);
    }).catch((err) => {
      reject(err);
    });
  });
};

const getAcknowledgement = (entities) => {
  let acknowledgement;
  const intent = _.get(entities, 'intent[0].value');

  if (intent === 'acknowledgeFeelings') {
    _.forOwn(entities, (value, key) => {
      if (key !== 'intent') {
        acknowledgement = convertFeelingToAcknowledgement(key);
      }
    });
  };

  return acknowledgement;
};

module.exports = {
  getAllShows,
  getGif,
  getAcknowledgement,
};
