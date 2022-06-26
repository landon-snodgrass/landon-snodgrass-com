<script setup>
import { RouterView } from 'vue-router';
import SideNav from './components/layout/navigation/SideNav.vue';
import TopNav from './components/layout/navigation/TopNav.vue';
import Footer from './components/layout/Footer.vue';
</script>

<template>
    <TopNav ref="topNav" />
    <div class="main-content">
        <SideNav :scrollActive="scrollActive" />
        <main>
            <RouterView v-slot="{ Component, route }">
                <Transition name="fade">
                    <div :key="route.name">
                        <component :is="Component" />
                    </div>
                </Transition>
            </RouterView>
        </main>
    </div>
    <Footer />
</template>

<style lang="scss">
@import '@/assets/base.css';
@import '@/assets/variables.scss';
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

.fade-enter-active {
    transition: all 2s ease-in;
    .container {
        .fancy-header {
            h1 {
                transition: all 0.5s ease-in;
                transition-delay: 0.5s;
            }
        }
        .fancy-subtitle {
            transition: all 0.5s ease-in;
            transition-delay: 1s;
        }
    }
}

.fade-enter-from {
    opacity: 0;
    .container {
        .fancy-header {
            h1 {
                left: -15px;
                opacity: 0;

                span {
                    opacity: 0;
                    &:first-of-type,
                    &:nth-of-type(3) {
                        top: -20px;
                    }
                    &:nth-of-type(2) {
                        top: 20px;
                    }
                }
            }
        }
        .fancy-subtitle {
            opacity: 0;
        }
    }
}

.fade-enter-to {
    opacity: 1;
    .container {
        .fancy-header {
            h1 {
                left: 0;
                opacity: 1;
            }
            span {
                opacity: 1;
                top: 0;
            }
        }
        .fancy-subtitle {
            opacity: 1;
        }
    }
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
        max-width: 100vw;

        main {
            flex: 1;
        }
    }
}
</style>
