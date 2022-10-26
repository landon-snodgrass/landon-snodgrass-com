<script>
export default {
    props: ['height', 'status'],
    data() {
        return {
            iconClasses: {
                'fa-bounce': true,
            },
            iconName: 'envelope',
            messageClasses: {
                hidden: true,
            },
            messageText: 'Message sent!',
            count: 0,
            cssVariables: {},
        };
    },
    computed: {
        cssVariables() {
            return {
                '--form-height': this.height + 70 + 'px',
            };
        },
    },
    methods: {
        loaderAnimationIterate() {
            this.count++;

            if (this.status == 202 && this.count >= 2) {
                this.iconClasses = {
                    spin: true,
                };
            } else {
                this.messageText =
                    'Something went wrong! Sorry, try again later.';
            }
        },
        loaderAnimationEnd() {
            if (this.iconName == 'envelope') {
                this.iconName = 'paper-plane';
                this.iconClasses = {
                    'pop-in': true,
                };
            } else {
                this.iconClasses = {
                    'fly-away': true,
                };
                this.messageClasses = {
                    'text-fade-in': true,
                };
            }
        },
    },
};
</script>

<template>
    <div
        class="loader-container"
        :style="{ height: height + 'px', ...cssVariables }"
    >
        <font-awesome-icon
            :icon="iconName"
            :class="iconClasses"
            size="xl"
            @animationiteration="loaderAnimationIterate"
            @animationend="loaderAnimationEnd"
        ></font-awesome-icon>
        <h1 :class="messageClasses">{{ messageText }}</h1>
    </div>
</template>

<style lang="scss">
@import '@@/assets/variables.scss';

.loader-container {
    display: flex;
    place-items: center;
    justify-content: center;
    font-size: 44px;
    flex-direction: column;
    overflow: hidden;

    h1 {
        font-size: 36px;
        @include font-display;
        opacity: 0;
        position: absolute;
    }
}

.spin {
    animation: spin 0.3s linear;
}

.pop-in {
    animation: popin 0.3s linear;
}

.fly-away {
    animation: fly-away 0.5s linear;
    animation-fill-mode: forwards;
}

.text-fade-in {
    animation: popin 0.3s linear;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
    opacity: 1 !important;
    transition: 0.3s;
    transition-delay: 0.5s;
}

@keyframes spin {
    0% {
        transform: rotate(0deg) scale(1);
    }
    100% {
        transform: rotate(900deg) scale(0);
    }
}

@keyframes popin {
    0% {
        transform: scale(0);
    }

    90% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes fly-away {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(
            calc(var(--form-height) / 2),
            calc(var(--form-height) / 2 * -1)
        );
    }
}
</style>
