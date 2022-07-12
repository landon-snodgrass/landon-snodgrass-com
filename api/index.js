require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
var cors = require('cors');
var cron = require('node-cron');
const axios = require('axios');
const app = express();
const port = 3080;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

app.use(cors());

const jsonParser = bodyParser.json();

// const msg = {
//     to: 'g.l.snodgrass95@gmail.com',
//     from: 'g.l.snodgrass95@gmail.com',
//     subject: 'Send with SendGrid!',
//     text: 'Bonk bonk bonk',
//     html: '<strong>html baby</strong>',
// };

// sgMail
//     .send(msg)
//     .then((response) => {
//         console.log(response[0].statusCode);
//         console.log(response[0].headers);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

const limiter = rateLimit({
    windowMs: 1000 * 60 * 30,
    max: 1,
});

const phoenixLocation = {
    lon: -112.074036,
    lat: 33.448376,
};

const seattleLocation = {
    lon: -122.332069,
    lat: 47.606209,
};

const phoenixFetchUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${phoenixLocation.lat}&lon=${phoenixLocation.lon}&exclude=minutely,hourly,daily,alerts&units=imperial&appid=${process.env.WEATHER_API_KEY}`;

const seattleFetchUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${seattleLocation.lat}&lon=${seattleLocation.lon}&exclude=minutely,hourly,daily,alerts&units=imperial&appid=${process.env.WEATHER_API_KEY}`;

//app.use(limiter);

var weatherData = {};

async function getWeatherData() {
    console.log('Getting weather data');
    console.log(new Date().toString());
    try {
        const [phoenixResponse, seattleResponse] = await Promise.all([
            axios.get(phoenixFetchUrl),
            axios.get(seattleFetchUrl),
        ]);
        // const [phoenixData, seattleData] = await Promise.all([
        //     phoenixResponse.json(),
        //     seattleResponse.json(),
        // ]);
        weatherData = {
            status: 200,
            phoenix: phoenixResponse.data.current,
            seattle: seattleResponse.data.current,
        };
    } catch (err) {
        weatherData = {
            error: err,
            status: 500,
        };
    }
}

app.post('/api/contact', jsonParser, (req, res) => {
    console.log(req.body, ' POST /api/contact');
    res.status(200).send('Okay!');
});

app.get('/api/weather', cors(), async (req, res) => {
    res.status(weatherData.status).send(weatherData);
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
    console.log('Running listening event');
    // getWeatherData();
    // cron.schedule('* 15 * * * *', () => {
    //     getWeatherData();
    // });
});
