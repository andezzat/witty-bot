const request = require('request');

function Sickrage(opts) {
  this.ipAddr = opts.server;
  this.port = opts.port;
  this.apiToken = opts.api_token;

  this.apiEndPoint = `http://${this.ipAddr}:${this.port}/api/${this.apiToken}/`;
  console.log('Created Sickrage instance with endpoint: ', this.apiEndPoint);
};

Sickrage.prototype.getAllShows = function (opts) {
  return new Promise((resolve, reject) => {
    this.callSickrageAPI({
      cmd: 'shows',
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
};

Sickrage.prototype.callSickrageAPI = function (qs) {
  return new Promise((resolve, reject) => {
    request({
      uri: this.apiEndPoint,
      qs,
      method: 'GET'
    }, (err, res, body) => {
      if (!err && res.statusCode == 200) {
        console.log('Got a response from Sickrage!');
        resolve(body);
      } else {
        console.error('Sickrage API Error encountered...');
        console.error(err || res);
        reject(err || res);
      };
    });
  });
};

module.exports = Sickrage;
