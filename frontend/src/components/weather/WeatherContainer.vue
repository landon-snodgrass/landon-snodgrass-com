<script>
import WeatherDetails from './WeatherDetails.vue';

export default {
    props: ['weatherData'],
    data() {
        return {
            weatherIconPath: 'http://openweathermap.org/img/wn/',
            error: false,
        };
    },
    components: {
        WeatherDetails,
    },
    computed: {
        weatherMessage() {
            if (this.weatherData.error || this.weatherData.phoenix.temp == 0) {
                this.error = true;
                return 'Sorry, looks like something went wrong with the backend.';
            }
            const result = Math.sign(
                this.weatherData.phoenix.temp - this.weatherData.seattle.temp
            );
            const messageArray = [
                'How is it hotter in Seattle than in Phoenix?!',
                "Wow, I'm paying so much more in rent for it to be the same temperature...",
                'Looks like it was a good idea to move to Seattle.',
            ];
            return messageArray[result + 1];
        },
    },
};
</script>

<template>
    <div class="weather">
        <h2 class="weather-message">{{ weatherMessage }}</h2>
        <div class="weather-container" v-if="!error">
            <weather-details
                :weather-data="weatherData.phoenix"
                :weather-icon-path="
                    weatherIconPath + weatherData.phoenix.icon + '@2x.png'
                "
            ></weather-details>
            <weather-details
                :weather-data="weatherData.seattle"
                :weather-icon-path="
                    weatherIconPath + weatherData.seattle.icon + '@2x.png'
                "
            ></weather-details>
        </div>
    </div>
</template>

<style lang="scss">
@import '@@/assets/common.scss';
@import '@@/assets/variables.scss';

.weather {
    height: 260px;
}

.weather-message {
    @include font-serif-bold;
    margin-bottom: 20px;
}

.weather-container {
    display: flex;
    justify-content: space-evenly;

    .weather-info {
        background: $color-dark;
        color: #fff;
        border-radius: 5px;
        padding: 10px;
        box-shadow: 5px 5px 0px 0px $color-secondary-dark;

        .weather-details {
            display: flex;
            align-items: center;
            justify-content: center;

            .weather-temp {
                width: 100px;
                font-size: 38px;
                margin: 0;
            }

            .weather-city {
                margin-right: 5px;
            }
        }
    }
}
</style>
