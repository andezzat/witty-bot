module.exports = {
  /* eslint-disable no-console */
  log: (...args) => {
    args.forEach((arg) => {
      console.log(arg);
    });
  },
  warn: (...args) => {
    args.forEach((arg) => {
      console.warn(arg);
    });
  },
  error: (...args) => {
    args.forEach((arg) => {
      console.error(arg);
    });
  },
};
