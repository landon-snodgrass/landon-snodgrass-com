<script>
import { RouterView } from 'vue-router';
import SideNav from './components/layout/navigation/SideNav.vue';
import TopNav from './components/layout/navigation/TopNav.vue';
import Footer from './components/layout/Footer.vue';

export default {
    data() {
        return {
            prevHeight: 0,
        };
    },
    components: {
        SideNav,
        TopNav,
        Footer,
        RouterView,
    },
    methods: {
        beforeLeave(element) {
            this.prevHeight = getComputedStyle(element).height;
        },
        enter(element) {
            const { height } = getComputedStyle(element).height;

            element.style.height = this.prevHeight;

            setTimeout(() => {
                element.style.height = height;
            });
        },
        afterEnter(element) {
            element.style.height = 'auto';
        },
    },
};
</script>

<template>
    <top-nav ref="topNav"></top-nav>
    <div class="main-content">
        <side-nav :scrollActive="scrollActive"></side-nav>
        <main>
            <RouterView v-slot="{ Component, route }">
                <Transition
                    name="fade"
                    mode="out-in"
                    @beforeLeave="beforeLeave"
                    @enter="enter"
                    @afterEnter="afterEnter"
                >
                    <div :key="route.name">
                        <component :is="Component" />
                    </div>
                </Transition>
            </RouterView>
        </main>
    </div>
    <Footer></Footer>
</template>

<style lang="scss">
@import '@@/assets/base.css';
@import '@@/assets/variables.scss';
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;700&family=Fascinate&family=Mulish:wght@500;700&display=swap');

.vue-universal-modal {
    z-index: 3;

    .modal {
        padding: 30px;
        max-width: 1030px;
        max-height: 415px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 10px;
        border: solid 5px $color-orange;
        font-size: 20px;
        text-align: center;
        transition: all 0.25s;
        overflow: hidden;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition-duration: 0.3s;
    transition-property: height, opacity;
    transition-timing-function: ease;
    overflow: hidden;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

#app {
    max-width: 100vw;
    height: 100vh;
    font-weight: normal;
    display: flex;
    flex-direction: column;

    .main-content {
        display: flex;
        flex: 1;

        main {
            flex: 1;
        }
    }
}

.grecaptcha-badge {
    z-index: 999;
}
</style>
