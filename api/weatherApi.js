const axios = require('axios');
const cron = require('node-cron');

let data;

const fetchUrl = (lat, lon) =>
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=imperial&appid=${process.env.WEATHER_API_KEY}`;

const phoenixLocation = {
    lon: -112.074036,
    lat: 33.448376,
};

const seattleLocation = {
    lon: -122.332069,
    lat: 47.606209,
};

const config = {
    phoenixFetchUrl: fetchUrl(phoenixLocation.lat, phoenixLocation.lon),
    seattleFetchUrl: fetchUrl(seattleLocation.lat, seattleLocation.lon),
};

const getWeatherData = async () => {
    try {
        const [phoenixResponse, seattleResponse] = await Promise.all([
            axios.get(config.phoenixFetchUrl),
            axios.get(config.seattleFetchUrl),
        ]);
        return (weatherData = {
            status: 200,
            phoenix: phoenixResponse.data.current,
            seattle: seattleResponse.data.current,
        });
    } catch (err) {
        return (weatherData = {
            error: err,
            status: 500,
        });
    }
};

module.exports = {
    getWeatherData,
};
