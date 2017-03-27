const allShows = (shows) => {
  let text = 'Guide: [Show Name] ([Next Episode Airing Date]) on [Network] in [Quality] - [Status]\n\n';

  Object.keys(shows).forEach(showId => {
    const show = shows[showId];
    text += `${show.show_name} (${show.next_ep_airdate || 'N/A'}) on ${show.network} in ${show.quality} - ${show.status}\n`;
  });

  return text;
};

const allAuctions = (auctions) => {
  let text = '';

  auctions.forEach((auction, key) => {
    text += `${key + 1}. ${auction}\n`;
  });

  return text;
};

module.exports = {
  allShows,
  allAuctions,
};
