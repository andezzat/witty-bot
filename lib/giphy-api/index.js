const request = require('request');
const _ = require('lodash');

function Giphy(opts) {
  this.apiKey = _.get(opts, 'api_key') || 'dc6zaTOxFJmzC'; // Reverts to public beta key if no API Token supplied.
  this.endPoint = 'http://api.giphy.com';
};

Giphy.prototype.random = function (params) {
  return new Promise((resolve, reject) => {
    this.callGiphyAPI('/v1/gifs/random', params).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
};

Giphy.prototype.callGiphyAPI = function (path, params) {
  return new Promise((resolve, reject) => {
    request({
      uri: this.endPoint + path,
      qs: Object.assign({}, { api_key: this.apiKey }, params),
      method: 'GET',
    }, (err, res, body) => {
      if (!err && res.statusCode == 200) {
        console.log('Got a response from Giphy!');
        resolve(JSON.parse(body));
      } else {
        console.error('Giphy API Error encountered...');
        console.error(err || body);
        reject(err || body);
      };
    });
  });
};

module.exports = Giphy;
