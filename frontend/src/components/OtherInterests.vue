<script>
export default {
    data() {
        return {
            interests: {
                weightLifting: {
                    title: 'Fitness',
                    attribution:
                        'Weight Lifting by emma mitchell from NounProject.com',
                    icon: 'weight-lifting.svg',
                    description:
                        'I like to keep active in anyway I can, usually weight lifting and running. Not only does it help me feel better physically but it helps my mental health tremendously.',
                },
                videoGames: {
                    title: 'Video Games',
                    attribution:
                        'Game Boy by HeadsOfBirds from NounProject.com',
                    icon: 'gameboy.svg',
                    description:
                        "I love playing video games. It's one of the ways I've kept in touch with my friends across the country.",
                },
                gameDevelopment: {
                    title: 'Game Development',
                    attribution:
                        'Game Development by Angelica from NounProject.com',
                    icon: 'game-dev.svg',
                    description:
                        "I'm a hobbiest game developer. I haven't finished a game yet but I've started a lot if that counts for anything. My engine of choice is Godot but I've dabbled in a few others.",
                },
                rockClimbing: {
                    title: 'Rock Climbing',
                    attribution:
                        'Rock Climbing by Abner Ignatius from NounProject.com',
                    icon: 'rock-climbing.svg',
                    description:
                        'My dad got me into rock climbing when I was a kid and I fell in love with it. The coolest thing I\'ve climbing was "The Monk" on Camelback Mountain in Phoenix. It\'s an ~80 foot rock jutting out of the Mountain.',
                },
                guitar: {
                    title: 'Music',
                    attribution: 'Guitar by Warunk Icon from NounProject.com',
                    icon: 'guitar.svg',
                    description:
                        "I've been playing music since I was in 6th grade and I got my first guitar. I've since learned multiple instruments and taught myself to record/mix/produce music as well.",
                },
                chess: {
                    title: 'Chess',
                    attribution: 'Chess by Vectorstall from NounProject.com',
                    icon: 'chess.svg',
                    description:
                        "I recently started playing chess online. I'm not very good yet, but I have a lot of fun playing and I'm studying hard to get better.",
                },
            },
            isFlipped: false,
            interestDescription: '',
            currentIcon: '',
            interestTitle: '',
            blankInterest: {
                title: '',
                icon: '',
                attribution: '',
                description: '',
            },
        };
    },
    methods: {
        flipCard(isFlipped, interest) {
            this.interestDescription = interest.description;
            this.currentIcon = 'icons\\' + interest.icon;
            this.interestTitle = interest.title;
            this.isFlipped = isFlipped;
            this.currentAttribution = interest.attribution;
        },
    },
};
</script>

<template>
    <div class="interest-container">
        <div class="interest-card" :class="{ flipped: isFlipped }">
            <div class="interest-card-front">
                <h3>My other interests and hobbies</h3>
                <ul class="interest-list">
                    <li v-for="interest in interests" :key="interest.title">
                        <span
                            class="tooltip"
                            :data-text="interest.title"
                            @click="flipCard(true, interest)"
                        >
                            <img :src="'icons\\' + interest.icon" />
                        </span>
                    </li>
                </ul>
            </div>
            <div class="interest-card-back">
                <div class="top-row">
                    <p class="back" @click="flipCard(false, blankInterest)">
                        &lt; Back
                    </p>
                    <span class="tooltip" :data-text="currentAttribution">
                        <img :src="currentIcon" />
                    </span>
                </div>
                <div class="bottom-row">
                    <h3>{{ interestTitle }}</h3>
                    <p class="interest-description">
                        {{ interestDescription }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@@/assets/variables.scss';

$icon-size: 90px;

@keyframes flip {
    0% {
        transform: rotateX(0);
    }

    90% {
        transform: rotateX(210deg);
    }

    100% {
        transform: rotateX(180deg);
    }
}

.interest-container {
    perspective: 1000px;

    .interest-card {
        position: relative;
        transition: 0.3s ease-out;
        transform-style: preserve-3d;
        width: 665px;
        height: 270px;
        margin: 60px auto 0;
        border: solid 5px $color-dark;
        border-radius: 10px;
        box-shadow: 10px 10px 0px 0px $color-orange;

        &.flipped {
            animation: flip 0.3s linear;
            transform: rotateX(180deg);
            background: $color-orange;
            box-shadow: -10px -10px 0px 0px $color-dark;

            .interest-card-front {
                pointer-events: none;
            }
        }

        .interest-card-front,
        .interest-card-back {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
        }

        .interest-card-back {
            transform: rotateX(180deg);
            justify-content: space-between;
            max-height: 100%;

            .top-row {
                display: flex;
                justify-content: space-between;
                width: 100%;

                .back {
                    @include font-serif-bold;
                    font-size: 24px;
                    align-self: flex-start;
                    padding: 5px;
                    cursor: pointer;
                    text-decoration: underline dotted;
                }
            }

            .bottom-row {
                margin-top: -25px;
                overflow-y: auto;
                scroll-behavior: smooth;

                &::-webkit-scrollbar {
                    width: 10px;
                }

                &::-webkit-scrollbar-track {
                    background: transparent;
                }

                &::-webkit-scrollbar-thumb {
                    color: $color-dark;
                    background: $color-dark;
                    border-radius: 5px;
                }

                h3 {
                    padding-left: 10px;
                    position: relative;
                }
                .interest-description {
                    @include font-serif-bold;
                    font-size: 24px;
                    padding: 0 0 10px 10px;
                    overflow-y: hidden;
                }
            }
        }
    }

    h3 {
        @include font-display;
        font-size: 32px;
    }

    ul {
        list-style: none;
        padding: 0;
        display: flex;

        li {
            display: block;
            padding: 0;

            span {
                display: block;
                max-height: $icon-size;
            }
        }
    }

    img {
        width: $icon-size;
        height: $icon-size;
    }
}
</style>
