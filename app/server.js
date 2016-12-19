const express = require('express');
const bodyParser = require('body-parser');
const Wit = require('node-wit').Wit;
const log = require('node-wit').log;

const { eventHandler, receivedBotResponse } = require('./handler');
const { loopThroughEvents } = require('./helper');
const { WIT_SERVER_ACCESS_TOKEN } = require('../config');
const response = require('./response');

const app = express();


app.set('port', (process.env.PORT || 5000));

// Process application/x-www/form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', (req, res) => {
  res.send('Hello world, I am a chat bot!');
});

// For facebook verification
app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === 'verify_me_pls_123') {
    res.status(200).send(req.query['hub.challenge']);
    console.log('Got a successfull webhook verification!');
  } else {
    res.send('Error, wrong token!');
  };
});

app.post('/webhook', (req, res, next) => {
  res.sendStatus(200);
  next();
}, (req, res) => {
  const processMessage = (event) => {
    eventHandler(event);
  }

  loopThroughEvents(req, processMessage);
  res.end();
});

// Start the server
app.listen(app.get('port'), () => {
  console.log('Running on port', app.get('port'));
});
