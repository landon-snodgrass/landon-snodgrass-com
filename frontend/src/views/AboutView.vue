<script>
import WeatherContainer from '../components/weather/WeatherContainer.vue';
import MoreInfo from '../components/weather/MoreInfo.vue';
import OtherInterests from '../components/OtherInterests.vue';

export default {
    inject: ['backendUrl'],
    data() {
        return {
            isShow: false,
            moreInfo: false,
            modalStyle: {},
            weatherData: {
                seattle: {
                    temp: 0,
                    icon: '',
                    description: '',
                    cityName: 'Seattle',
                },
                phoenix: {
                    temp: 0,
                    icon: '',
                    description: '',
                    cityName: 'Phoenix',
                },
            },
            //Modal animation data
            beforeEnterStyle: {
                opacity: '0',
                transform: 'translateY(20px)',
            },
            afterEnterStyle: {
                opacity: '1',
                transform: 'translateY(0px)',
            },
        };
    },
    components: {
        WeatherContainer,
        MoreInfo,
        OtherInterests,
    },
    computed: {
        currentModalComponent() {
            if (this.moreInfo) {
                return 'MoreInfo';
            }
            return 'WeatherContainer';
        },
        currentModalComponentProps() {
            if (this.moreInfo) {
                return {};
            }
            return {
                weatherData: this.weatherData,
            };
        },
    },
    mounted() {
        this.getWeatherData();
    },
    methods: {
        showWeatherModal() {
            this.isShow = true;
            this.moreInfo = false;
        },
        closeWeatherModal() {
            this.isShow = false;
        },
        showMoreInfo() {
            this.moreInfo = true;
        },
        hideMoreInfo() {
            this.moreInfo = false;
        },
        updateModalSize(el) {
            if (this.moreInfo) {
                this.modalStyle = {
                    width: '1100px',
                };
            } else {
                this.modalStyle = {
                    width: '650px',
                };
            }
        },
        async getWeatherData() {
            const response = await fetch(`${this.backendUrl}/api/weather`);
            const responseJson = await response.json();
            if (responseJson.status == 200) {
                const seattleData = {
                    temp: Math.round(responseJson.seattle.temp),
                    icon: responseJson.seattle.weather[0].icon,
                    description: responseJson.seattle.weather[0].description,
                    cityName: 'Seattle',
                };
                const phoenixData = {
                    temp: Math.round(responseJson.phoenix.temp),
                    icon: responseJson.phoenix.weather[0].icon,
                    description: responseJson.phoenix.weather[0].description,
                    cityName: 'Phoenix',
                };
                this.weatherData.seattle = { ...seattleData };
                this.weatherData.phoenix = { ...phoenixData };
            } else {
                this.weatherData = {
                    error: 'Something went wrong in the backend.',
                };
            }
        },
    },
};
</script>

<template>
    <Modal v-model="isShow" :close="closeWeatherModal">
        <div class="modal" :style="modalStyle">
            <Transition
                mode="out-in"
                name="icon-fade"
                @before-enter="updateModalSize"
            >
                <more-info key="0" v-if="moreInfo"></more-info>
                <weather-container
                    key="1"
                    :weather-data="weatherData"
                    v-else
                ></weather-container>
                <!-- <KeepAlive>
                    <component
                        :is="currentModalComponent"
                        v-bind="currentModalComponentProps"
                        ref="modalComponent"
                    ></component>
                </KeepAlive> -->
            </Transition>
            <button class="main-button" @click="closeWeatherModal">
                Close
            </button>
            <a href="#" class="more-info" @click="hideMoreInfo" v-if="moreInfo">
                &lt; Back
            </a>
            <a href="#" class="more-info" @click="showMoreInfo" v-else>
                What is this?
            </a>
        </div>
    </Modal>
    <div class="container about-container">
        <blurb text-size="medium" class="text-medium">
            <template #header>Who is Landon?</template>
            <template #default>
                I literally ask myself that
                <span class="tooltip" data-text="Queue existential crisis">
                    everyday...
                </span>
                The long and short of it is I'm a self-taught web developer and
                musician who lives in Seattle, WA. I was born in Phoenix, AZ and
                move to Seattle in Novemeber 2021 because I've had enough
                <a href="#" @click.prevent="showWeatherModal">
                    <span
                        class="tooltip"
                        data-text="Click to see if I made the right choice."
                    >
                        sunshine for a lifetime.
                    </span>
                </a>
                <br />
                <br />
                I went to ASU for Computer Science but dropped out and taught
                myself web development via online courses. I consider myself a
                pretty fast learner which lends itself well to a career in the
                fast paced field of tech.
                <br />
                <br />
                I try to keep equity and accessibility at the heart of
                everything I do but I know I'm not perfect so I'm always looking
                for opportunities to learn and improve. Constantly learning
                seems to be the theme of my life; I most certainly won't ever
                know everything but that doesn't mean I can't try.
            </template>
        </blurb>
        <other-interests></other-interests>
    </div>
</template>

<style lang="scss">
@import '@/assets/common.scss';

.about-container {
    display: flex;
    flex-direction: column;
}

.icon-fade-enter-active,
.icon-fade-leave-active {
    transition: all 0.25s ease;
}

.icon-fade-enter-active {
    transition-delay: 0.25s;
}

.icon-fade-enter-to,
.icon-fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.icon-fade-enter-from,
.icon-fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>
