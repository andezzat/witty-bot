const Xray = require('x-ray');
const x = Xray({
  filters: {
    trim: (value) => {
      return typeof value === 'string' ? value.trim() : value;
    },
  },
});

const url = 'http://auctions.search.yahoo.co.jp/search?p=sw20&ei=UTF-8&oq=&auccat=2084201586&mode=1&slider=0&tab_ex=commerce&istatus=2';

module.exports = {
  scrape: () => {
    return new Promise((resolve, reject) => {
      x(url, '#list01 .inner', ['h3 | trim'])((err, obj) => {
        if (err) {
          reject(err);
        } else {
          resolve(obj);
        };
      });
    });
  }
}
