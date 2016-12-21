const request = require('request');

function giphy(opts) {
  this.apiKey = opts.api_key || 'dc6zaTOxFJmzC'; // Reverts to public beta key if no API Token supplied.
  this.endPoint = 'http://api.giphy.com/';
};

giphy.prototype.random = function (params) {
  return new Promise((resolve, reject) => {
    this.callGiphyAPI(params).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
};

giphy.prototype.callGiphyAPI = function (params) {
  return new Promise((resolve, reject) => {
    request({
      uri: `${this.endPoint}/${opts.path}`,
      qs: Object.assign({}, { api_key: this.apiKey }, params}),
      method: 'GET',
    }, (err, res, body) => {
      if (!err && res.statusCode == 200) {
        console.log('Got a response from Giphy!');
        resolve(body);
      } else {
        console.error('Giphy API Error encountered...');
        console.error(err || res);
        reject(err || res);
      };
    });
  });
};

module.exports = {
  giphy,
};
