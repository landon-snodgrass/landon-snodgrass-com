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
        <div class="fancy-header">
            <h1>
                Hello, I'm Landon.<span>/</span><span>/</span><span>/</span>
            </h1>
        </div>
        <div class="fancy-subtitle">
            <p class="lead">I'm a front-end engineer living in Seattle.</p>
        </div>
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
</template>

<style lang="scss">
@import '@/assets/variables.scss';

.container {
    width: 80%;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 5px;

    .fancy-header {
        border-bottom: 2px solid #264653;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background: #f4a261;
        padding: 0 20px;
        margin-top: 30px;
        height: 48px;
        width: 60%;

        h1 {
            font-family: 'Fascinate', cursive;
            font-weight: $font-weight-bold;
            font-size: 58px;
            color: #264653;
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
            font-family: 'Cormorant Garamond', serif;
            font-weight: $font-weight-bold;
            position: relative;
            top: -30px;
        }
    }

    .skills {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        width: 60%;

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
                display: inline;
                margin-right: 10px;
                padding: 0 10px;
                font-family: 'Cormorant Garamond', serif;
                font-weight: $font-weight-bold;
                font-size: 24px;
                height: 30px;

                &:hover {
                    cursor: pointer;
                    text-decoration: underline;
                }

                &.active {
                    background: #f4a261;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }
            }
        }

        .skills-container {
            background: #f4a261;
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
                    background: #264653;
                    color: #e9c46a;
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
        font-family: 'Cormorant Garamond', serif;
        font-weight: $font-weight-bold;
    }
}
</style>
