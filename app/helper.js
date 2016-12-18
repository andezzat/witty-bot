const loopThroughEvents = (req, execute) => {
  const data = req.body;

  if (data.object === 'page') {
    data.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        execute(event);
      });
    });
  }
}

module.exports = {
  loopThroughEvents,
}
