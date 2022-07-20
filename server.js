// Server def
require('dotenv').config();
const express = require('express');
const server = express();
const history = require('connect-history-api-fallback');

// Server setup
server.use(express.json());

// Third Party Libraries
const cron = require('node-cron');

// API definitions
const weatherApi = require('./api/weatherApi.js');
let weatherData;
cron.schedule('*/15 * * * *', async () => {
    weatherData = await weatherApi.getWeatherData();
    console.log(weatherData);
});
server.get('/api/weather', async (_, res) => {
    if (weatherData) {
        console.log(weatherData);
        res.status(weatherData.status).send(weatherData);
    } else {
        weatherData = await weatherApi.getWeatherData();
        console.log(weatherData);
        res.status(weatherData.status).send(weatherData);
    }
});

const mailApi = require('./api/mailApi.js');
server.post('/api/contact', (req, res) => {
    mailApi.sendContactForm(req, res);
});

// Routing fallback
server.use(history());

// Static client serving
server.use(express.static(__dirname + '/dist'));

// Server start
const port = process.env.PORT || 3080;

server.listen(port, () => console.log(`Server listening on PORT:${port}`));
