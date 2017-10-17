'use strict';

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log(req.headers);
  console.log(req.body);

  const action = req.body['result']['action'];
  console.log('action: ' + action);

  if (action.startsWith('ifttt')) {
    const key = JSON.parse(req.headers['keys'])['ifttt'];
    const event = action.split('.')[1];

    callIftttApi(event, key).then((message) => {
      res.json(message);
    }).catch((error) => {
      const errorMessage = {
        'speech': `An error occurred.`,
        'displayText': `An error occurred. ${error}`
      };
      res.json(errorMessage);
    });
  } else if (action.startsWith('weather')) {
    const appId = JSON.parse(req.headers['keys'])['openweathermap'];
    const city = req.body['result']['parameters']['geo-city'];
    const country = req.body['result']['parameters']['geo-country'];

    callOpenWeatherMapApi(city, country, appId).then((message) => {
      res.json(message);
    }).catch((error) => {
      const errorMessage = {
        'speech': `An error occurred.`,
        'displayText': `An error occurred. ${error}`
      };
      res.json(errorMessage);
    });
  }
});

function callIftttApi(event, key) {
  return new Promise(function(onFulfilled, onRejected) {
    if (event === undefined) return onRejected('IFTTT event is not defined');
    if (key === undefined) return onRejected('IFTTT key is not defined');

    const options = {
      uri: `https://maker.ifttt.com/trigger/${event}/with/key/${key}`,
      form: {
        value1: '',
        value2: '',
        value3: ''
      },
      json: true
    };

    request.post(options, (error, response, body) => {
      console.log('status code: ' + response.statusCode);
      console.log(body);

      if (error) return onRejected(`${response.statusCode}: ${body}`);
      if (response.statusCode !== 200) return onRejected(`${response.statusCode}: ${body}`);

      const responseToDialogflow = {
        'speech': body,
        'displayText': body
      };

      onFulfilled(responseToDialogflow);
    });
  });
}

function callOpenWeatherMapApi(city, country, appId) {
  return new Promise(function(onFulfilled, onRejected) {
    if (city === undefined) return onRejected('City is not defined');
    if (country === undefined) return onRejected('Country is not defined');
    if (appId === undefined) return onRejected('Open Weather Map app id is not defined');

    const options = {
      // units: default, imperial or metric
      uri: `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city},${country}&appid=${appId}`
    };

    console.log(options);

    request.post(options, (error, response, body) => {
      const result = JSON.parse(body);
      console.log('status code: ' + response.statusCode);
      console.log(result);

      if (error) return onRejected(`${response.statusCode}: ${body}`);
      if (response.statusCode !== 200) return onRejected(`${response.statusCode}: ${result['message']}`);

      const weather = `The current weather in ${result['name']} is ${result['weather'][0]['description']}, and the temperature is ${result['main']['temp']} °C, the humidity is ${result['main']['humidity']} %.`;
      console.log(weather);

      const responseToDialogflow = {
        'speech': weather,
        'displayText': weather
      };

      onFulfilled(responseToDialogflow);
    });
  });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});