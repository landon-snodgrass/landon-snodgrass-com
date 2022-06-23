<script setup>
import { RouterView } from 'vue-router';
import SideNav from './components/layout/navigation/SideNav.vue';
import TopNav from './components/layout/navigation/TopNav.vue';
</script>

<template>
    <TopNav />
    <div class="main-content">
        <SideNav />
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
</template>

<style lang="scss">
@import '@/assets/base.css';
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;700&family=Fascinate&family=Mulish:wght@500;700&display=swap');

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
    width: 100vw;
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
</style>
