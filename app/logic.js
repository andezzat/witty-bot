const Sickrage = require('../lib/sickrage');
const transform = require('./transform');

const { SICKRAGE_API_TOKEN } = require('../config');

const sr = new Sickrage({
  server: '192.168.1.10',
  port: '8081',
  api_token: SICKRAGE_API_TOKEN,
});

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
}

module.exports = {
  getAllShows,
};
