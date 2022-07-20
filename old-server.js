const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

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

var weatherData = {};

async function getWeatherData() {
    console.log('Getting weather data');
    console.log(new Date().toString());
    try {
        const [phoenixResponse, seattleResponse] = await Promise.all([
            axios.get(phoenixFetchUrl),
            axios.get(seattleFetchUrl),
        ]);
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

function createFormSubmissionBody(formData) {
    let html = '<p>';
    for (const field in formData) {
        html += `<p><strong>${field}:</strong> ${formData[field]}</p>`;
    }
    html += '</p>';
    return html;
}

app.post('/api/contact', (req, res) => {
    const submissionMsg = createFormSubmissionBody(req.body.msg);

    const msg = {
        to: 'g.l.snodgrass95@gmail.com',
        from: 'g.l.snodgrass95@gmail.com',
        subject: 'Contact form submission from LandonSnodgrass.com',
        html: submissionMsg,
    };

    sgMail
        .send(msg)
        .then((response) => {
            res.status(response[0].statusCode).send('Okay!');
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

app.get('/api/weather', cors(), async (req, res) => {
    try {
        res.status(weatherData.status).send(weatherData);
    } catch (err) {
        sgMail.send({
            to: 'g.l.snodgrass95@gmail.com',
            from: 'g.l.snodgrass95@gmail.com',
            subject: 'Error trying to get weather data for LandonSnodgrass.com',
            html: `<p>${error}</p>`,
        });
        res.status(500).send('Something went wrong');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath + '/index.html'));
});

const port = process.env.PORT || 3080;

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
    console.log('Running listening event');
    getWeatherData();
    cron.schedule('*/15 * * * *', () => {
        getWeatherData();
    });
});