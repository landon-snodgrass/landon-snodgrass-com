<script>
import SkillsList from '../components/SkillsList.vue';

export default {
    data() {
        return {
            skills: {
                allTheTime: [
                    {
                        name: 'Vue.js',
                        icon: ['fab', 'vuejs'],
                    },
                    {
                        name: 'React.js',
                        icon: ['fab', 'react'],
                    },
                    {
                        name: 'Sass',
                        icon: ['fab', 'sass'],
                    },
                    {
                        name: 'JavaScript',
                        icon: ['fab', 'js-square'],
                    },
                ],
                sometimes: [
                    {
                        name: 'Python',
                        icon: ['fab', 'python'],
                    },
                    {
                        name: 'Node.js',
                        icon: ['fab', 'node-js'],
                    },
                    {
                        name: '.NET',
                        icon: ['fas', 'file-lines'],
                    },
                ],
                learning: [
                    {
                        name: 'SQL',
                        icon: ['fas', 'database'],
                    },
                    {
                        name: 'Typescript',
                        icon: ['fas', 'code'],
                    },
                ],
            },
            currentSkillList: 'allTheTime',
        };
    },
    methods: {
        changeCurrentSkillList(newList) {
            this.currentSkillList = newList;
        },
        beforeLeave(el) {
            console.log(el.offsetParent);
            console.log(el, ' ', el.offsetLeft);
            el.style.left = `${el.offsetLeft}px`;
            //el.style.position = 'absolute';
        },
        afterLeave(el) {
            el.style.left = 0;
        },
    },
    computed: {
        skillList() {
            return this.skills[this.currentSkillList];
        },
    },
    components: { SkillsList },
};
</script>

<template>
    <div class="container">
        <div class="col-left">
            <div class="fancy-header">
                <h1>
                    Hello, I'm Landon.<span>/</span><span>/</span><span>/</span>
                </h1>
            </div>
            <div class="fancy-subtitle">
                <p class="lead">I'm a front-end engineer living in Seattle.</p>
            </div>
            <blurb>
                <template #header>Me in a few sentences</template>
                <template #default>
                    I'm incredibly passionate about equity and accessibility. I
                    love to learn and am constantly growing and challenging
                    myself. Tech evolves fast, I'm excited to evolve with it.
                </template>
            </blurb>
            <div class="skills">
                <div class="underline">
                    <p class="lead">Technologies I use</p>
                </div>
                <ul class="skills-frequency">
                    <li
                        :class="{ active: currentSkillList == 'allTheTime' }"
                        @click="changeCurrentSkillList('allTheTime')"
                    >
                        All the time
                    </li>
                    <li
                        :class="{ active: currentSkillList == 'sometimes' }"
                        @click="changeCurrentSkillList('sometimes')"
                    >
                        Sometimes
                    </li>
                    <li
                        :class="{ active: currentSkillList == 'learning' }"
                        @click="changeCurrentSkillList('learning')"
                    >
                        Learning
                    </li>
                </ul>
                <div class="skills-container">
                    <Transition name="icon-fade" mode="out-in">
                        <SkillsList
                            :skill-list="skillList"
                            :key="currentSkillList"
                        />
                    </Transition>
                </div>
            </div>
        </div>
        <div class="col-right">
            <div class="profile-image-container">
                <img
                    class="profile-image"
                    src="https://ik.imagekit.io/wwxxpwqes/tr:w-400,h-600/20220206_155220__1__T6FL5UiVp.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1657318099958"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/variables.scss';

.container {
    width: 90%;
    margin: 40px auto;
    display: flex;
    padding: 20px;
    border-radius: 5px;

    .col-left {
        flex: 2;
    }

    .col-right {
        flex: 1;
        display: flex;
        place-items: center;
    }

    .profile-image-container {
        display: flex;
        place-items: center;
        justify-content: space-around;
        flex-grow: 1;

        .profile-image {
            border-radius: 15px;
            border: solid 5px $color-dark;
            box-shadow: 10px 10px 0px 0px $color-orange;
            transition: 0.25s;

            &:hover {
                box-shadow: 15px 15px 0px 0px $color-orange;
                transform: translate(-5px, -5px);
                transform: rotate(2deg);
                cursor: pointer;
            }
        }
    }

    .fancy-header {
        border-bottom: 2px solid $color-dark;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background: $color-orange;
        padding: 0 20px;
        margin-top: 30px;
        height: 48px;
        width: 100%;

        h1 {
            @include font-display;
            font-size: 58px;
            color: $color-dark;
            position: relative;
            top: -40px;
            left: 0;
            opacity: 1;

            span {
                position: relative;
                display: inline-block;
                transition: all 0.5s linear;
                transition-delay: 1.25s;
                opacity: 1;
                top: 0px;
            }
        }

        p {
            font-size: 36px;
            @include font-serif-bold;
            position: relative;
            top: -30px;
        }
    }

    .skills {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        width: 100%;

        .underline {
            border-bottom: solid 2px;
        }

        .fancy-header {
            height: 26px;
        }

        .skills-frequency {
            list-style: none;
            padding: 0;
            display: flex;
            padding-top: 10px;

            li {
                @include font-serif-bold;
                display: inline;
                margin-right: 10px;
                padding: 0 10px;
                font-size: 24px;
                height: 35px;
                padding-bottom: 10px;
                margin-bottom: -2px;
                background-image: linear-gradient($color-orange 0 0);
                background-size: 200% 10px;
                background-position: 200% 100%;
                background-repeat: no-repeat;
                transition: 0.25s;

                &:hover {
                    cursor: pointer;
                    background-position: 100% 100%;
                }

                &.active {
                    background-size: 100% 100%;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }
            }
        }

        .skills-container {
            background: $color-orange;
            border-bottom: solid 2px;
            border-top-right-radius: 5px;
            position: relative;

            .tooltip {
                height: 64px;
                cursor: pointer;

                &:before {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100px;
                    height: auto;
                    padding: 10px;
                    border-radius: 10px;
                    background: $color-dark;
                    color: $color-gold;
                    text-align: center;
                    display: block;
                    opacity: 0;
                    transition: all 0.25s ease;
                }

                &:hover:before {
                    display: block;
                    opacity: 1;
                    transform: translate(-50%, -100%);
                }
            }

            .skills-icon {
                font-size: 64px;
            }
        }
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
    }

    .icon-fade-enter-from,
    .icon-fade-leave-to {
        opacity: 0;
        transform: translateY(20px);
    }

    p.lead {
        font-size: 36px;
        @include font-serif-bold;
    }
}
</style>
