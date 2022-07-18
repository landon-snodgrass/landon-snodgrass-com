<script>
export default {
    props: ['weatherData', 'weatherIconPath'],
};
</script>

<template>
    <div class="weather-info phoenix">
        <div class="weather-details">
            <img
                class="weather-icon"
                :src="weatherIconPath"
                :alt="weatherData.description"
                :title="weatherData.description"
            />
            <p class="weather-temp">{{ weatherData.temp }}&#176;</p>
        </div>
        <p class="weather-city">
            <small
                ><font-awesome-icon icon="map-marker-alt"></font-awesome-icon
                >&nbsp;{{ weatherData.cityName }}</small
            >
        </p>
    </div>
</template>
