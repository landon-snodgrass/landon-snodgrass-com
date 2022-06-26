<script>
export default {
    mounted() {
        console.log('More info mounted');
    },
};
</script>

<template>
    <div class="more-info-container">
        <h3 class="more-info-headline">More info about the weather modal:</h3>
        <p>
            This weather modal pulls (somewhat) real time weather data from
            Seattle and Phoenix via the
            <a href="https://openweathermap.org/">Open Weather Map API</a>. It
            then compares the two temperatures and displays a message based on
            the result. For example, if it's colder in Seattle it'll say
            something like, "It was a good idea to move here." but if it's the
            same temperature or it's hotter in Seattle it'll say something
            different. I thought it would be funny to include this comparison to
            emphasize my reasoning for moving to Seattle. I also thought it
            would show off my ability to work with a third-party API as a bonus.
        </p>
    </div>
</template>

<style lang="scss">
@import '@/assets/common.scss';
@import '@/assets/variables.scss';

.more-info-container {
    @include font-serif-bold;
    color: $color-dark;
    max-height: 100%;
    max-width: 100%;
    height: 260px;

    h3 {
        font: inherit;
        font-size: 28px;
    }

    p {
        font: inherit;
        font-size: 22px;

        a {
            font: inherit;
            color: $color-orange;
        }
    }
}
</style>
