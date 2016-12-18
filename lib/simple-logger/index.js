const _ = require('lodash');

module.exports = {
  /* eslint-disable no-console */
  log: (...args) => {
    _.forEach(args, (arg) => {
      console.log(arg);
    });
  },
  warn: (...args) => {
    _.forEach(args, (arg) => {
      console.warn(arg);
    });
  },
  error: (...args) => {
    _.forEach(args, (arg) => {
      console.error(arg);
    });
  },
};
