<script>
import { gsap } from 'gsap';

export default {
    props: ['width'],
    data() {
        return {
            workEntries: [
                {
                    slug: 'swiftpage-internship',
                    startDate: 'May 2018',
                    shortDate: '5/18',
                    company: 'Swiftpage (Now ACT LLC)',
                    position: 'Web Development Intern',
                    description:
                        'I started my career with an internship at Swiftpage. I was hired to build React.js components for a new headless WordPress site that would replace their product site. I also redesigned the company site myself and worked heavily in the CMS Sitefinity.',
                },
                {
                    slug: 'swiftpage-fulltime',
                    startDate: 'April 2019',
                    shortDate: '4/19',
                    company: 'Swiftpage (Now ACT LLC)',
                    position: 'Web Developer',
                    description:
                        'After a little under a year as an intern at Swiftpage, I was promoted to a full-time employee. I worked as the sole web developer (the old web developer left) maintaining the product and company sites. I worked heavily with the graphic designer to create seamless web experiences for users both internal and external.',
                },
                {
                    slug: 'gryphon',
                    startDate: 'January 2020',
                    shortDate: '1/20',
                    company: 'Gryphon LLC',
                    position: 'Developer I',
                    description:
                        'At Gryphon, I worked heavily with our clients to help design their sites. My biggest project was working on the redesign of the AirForce site (af.mil). This position was much more team focused than my previous roles. We followed an Agile workflow and interacted with the client on a daily basis.',
                },
                {
                    slug: 'milestone',
                    startDate: 'November 2021',
                    shortDate: '11/21',
                    company: 'Milestone - On Contract With Google',
                    position: 'Front-end Engineer',
                    description:
                        "Milestone brought me on to fulfill a front-end engineering position with Google. I worked on the Applied Digital Skills app in Google's education sector. It was an incredible learning experience not only for my front-end skills but for my vision of products. Google's investment in UI/UX is inspiring and it shows in their products.",
                },
            ],
            currentSpot: -1,
            currentProgress: -100,
            active: [],
            datePlacements: [],
        };
    },
    mounted() {
        this.currentSpot = 0;
        this.datePlacements = this.getDatePlacements();
    },
    methods: {
        setActiveForward(index) {
            for (let i = index + 1; i < this.workEntries.length; i++) {
                this.active[i] = false;
            }
            this.active[index] = true;
        },
        getArrowPlacementAt(spot) {
            const containerOffset =
                (this.$refs.dataContainer.offsetParent.clientWidth -
                    this.$refs.dataContainer.offsetWidth) /
                2;
            const dotOffset = this.dotWidth / 2;
            const dotPosition = spot * this.entryWidth;
            const lineOffset = this.startEndWidth;
            return dotPosition + lineOffset - dotOffset - containerOffset;
        },
        getDatePlacements() {
            let _datePlacements = [];
            this.$refs.dotLabels.forEach((label, index) => {
                const labelIndex = label.dataset.index;
                const labelOffset = (label.clientWidth - this.dotWidth) / 2;
                const labelStyle = { right: -labelOffset + 'px' };
                _datePlacements[labelIndex] = labelStyle;
            });
            return _datePlacements;
        },
        next() {
            this.currentSpot = Math.min(
                this.currentSpot + 1,
                this.workEntries.length - 1
            );
        },
        prev() {
            this.currentSpot = Math.max(this.currentSpot - 1, 0);
        },
    },
    watch: {
        currentSpot(newVal, oldVal) {
            const lineTimeline = gsap.timeline();
            const tweenObj = { val: this.currentProgress };

            lineTimeline.fromTo(
                '.entry-data-container',
                {
                    transformOrigin:
                        this.getArrowPlacementAt(oldVal) + 'px 110%',
                    duration: 0,
                },
                {
                    transform: 'scale(0)',
                    duration: 0.1,
                    ease: 'Power3.out',
                }
            );

            lineTimeline.to('.entry-data-container .arrow', {
                left: this.getArrowPlacementAt(newVal),
            });

            lineTimeline.to(tweenObj, {
                val: this.currentSpot * 100,
                duration: 0.2,
                ease: 'Power3.out',
                onUpdate: () => {
                    this.currentProgress = tweenObj.val;
                },
            });

            lineTimeline.fromTo(
                '.entry-data-container',
                {
                    transformOrigin:
                        this.getArrowPlacementAt(newVal) + 'px 110%',
                    duration: 0,
                },
                {
                    transform: 'scale(1)',
                    duration: 0.4,
                    ease: 'elastic.out(1, 0.9)',
                }
            );
        },
    },
    computed: {
        dotWidth() {
            return 25;
        },
        entryWidth() {
            // Adding 1 because of offset for start and end
            const numOfEntries = this.workEntries.length;
            return this.width / numOfEntries;
        },
        lineWidth() {
            return this.entryWidth - this.dotWidth;
        },
        startEndWidth() {
            return this.entryWidth / 2;
        },
        arrowPlacement() {
            return (
                this.currentSpot * this.entryWidth +
                this.startEndWidth -
                this.dotWidth
            );
        },
        currentEntry() {
            return this.currentSpot >= 0
                ? this.workEntries[this.currentSpot]
                : this.workEntries[0];
        },
        baseCss() {
            return {
                '--dot-width': this.dotWidth + 'px',
                '--entry-width': this.entryWidth + 'px',
                '--line-width': this.lineWidth + 'px',
                '--start-end-width': this.startEndWidth + 'px',
                '--total-width': this.width + 'px',
                '--top-padding': '120px',
                width: this.width + 'px',
            };
        },
    },
};
</script>

<template>
    <div class="timeline" :style="baseCss">
        <div class="info-row">
            <div
                class="prev"
                @click="prev"
                :style="{ visibility: currentSpot > 0 ? 'visible' : 'hidden' }"
            >
                <span class="material-symbols-outlined"> arrow_back_ios </span>
                <span class="material-symbols-outlined second">
                    keyboard_double_arrow_left
                </span>
            </div>
            <div class="entry-data-container" ref="dataContainer">
                <div class="text-container">
                    <p class="position">
                        <span>{{ currentEntry.position }}</span>
                        <span>{{ currentEntry.startDate }}</span>
                    </p>
                    <p class="company">
                        {{ currentEntry.company }}
                    </p>
                    <hr />
                    <p class="description">
                        {{ currentEntry.description }}
                    </p>
                </div>
                <div class="arrow"></div>
            </div>
            <div
                class="next"
                @click="next"
                :style="{ visibility: currentSpot < 3 ? 'visible' : 'hidden' }"
            >
                <span class="material-symbols-outlined second">
                    keyboard_double_arrow_right
                </span>
                <span class="material-symbols-outlined">
                    arrow_forward_ios
                </span>
            </div>
        </div>
        <div class="timeline-container">
            <div class="timeline-start">
                <progress
                    class="timeline-line"
                    max="100"
                    :value="currentProgress + 100"
                ></progress>
            </div>
            <div
                class="entry-container"
                v-for="(entry, index) in workEntries"
                :key="index"
            >
                <div class="entry-line-container">
                    <progress
                        class="timeline-line"
                        :id="'line-' + index"
                        max="100"
                        min="0"
                        :value="currentProgress - 100 * (index - 1)"
                        v-if="index > 0"
                        :style="{
                            width: lineWidth,
                        }"
                    ></progress>
                    <input
                        type="radio"
                        class="timeline-dot"
                        :class="{ active: currentProgress >= index * 100 }"
                        :value="index"
                        :id="'dot-' + index"
                        :data-entry="index"
                        v-model="currentSpot"
                    />
                    <label
                        :for="'dot-' + index"
                        :data-index="index"
                        :style="datePlacements[index]"
                        ref="dotLabels"
                    >
                        {{ entry.shortDate }}
                    </label>
                </div>
            </div>
            <div class="timeline-end">
                <progress class="timeline-line" max="100" value="0"></progress>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/variables.scss';

$numDots: 20;
$parentWidthBase: 0.8;
$parentWidth: $parentWidthBase * 100vw;
$parentMaxWidth: 1000px;
$dotWidth: 25px;
$active: $color-dark;
$inactive: #aeb6bf;

.timeline {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 300px;

    .info-row {
        display: flex;
        align-items: center;
        position: static;

        .next,
        .prev {
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.25s;
            cursor: pointer;

            span {
                transition: 0.25s;
            }

            .second {
                font-size: 38px;
                opacity: 0;
                transition: 0.25s;
            }

            &:hover {
                transform: translateX(-38px);

                span {
                    opacity: 0;
                }

                .second {
                    opacity: 1;
                }
            }
        }

        .next {
            &:hover {
                transform: translateX(38px);
            }
        }

        .entry-data-container {
            background: $active;
            border-radius: 5px;
            color: #fff;
            padding: 20px;
            margin: 0 15px 30px;
            transform: scale(0);
            position: static;
            @include font-serif-bold;

            .position {
                font-size: 24px;
                display: flex;
                justify-content: space-between;
            }

            .company {
                font-size: 18px;
            }

            .description {
                font-size: 18px;
            }

            .arrow {
                position: absolute;
                bottom: -25px;
                border-top: solid 25px $active;
                border-right: solid calc($dotWidth / 2) transparent;
                border-left: solid calc($dotWidth / 2) transparent;
                height: $dotWidth;
                width: $dotWidth;
            }
        }
    }

    .timeline-container {
        display: flex;
        justify-content: space-around;
        align-items: center;

        .timeline-line {
            height: calc(var(--dot-width) / 5);
            width: calc(var(--line-width));
            max-width: 100%;
            display: block;
            background-color: $active;

            &::-webkit-progress-bar {
                background-color: $inactive;
            }

            &::-webkit-progress-value {
                background-color: $active;
            }
        }
    }

    .timeline-start,
    .timeline-end {
        width: var(--start-end-width);
        align-self: flex-end;
        margin-bottom: calc($dotWidth / 2);
        transform: translateY(50%);

        & ~ .entry-container {
            justify-content: flex-end;
        }
    }

    .entry-container {
        display: flex;
        position: static;
        flex-direction: column;
        justify-content: center;

        .entry-data-container {
            display: flex;
            justify-content: flex-end;
            position: static;

            .text-container {
                position: absolute;
                width: var(--total-width);
                left: 0;
                bottom: 50px;
                background: $active;
                color: #fff;
                padding: 0px;
                border-radius: 5px;
                display: none;
                height: 0px;
            }
        }

        .entry-line-container {
            display: flex;
            align-items: center;

            .timeline-dot {
                width: var(--dot-width);
                height: var(--dot-width);
                background-color: $inactive;
                position: relative;
                border-radius: 50%;
                display: block;
                appearance: none;
                cursor: pointer;

                &:focus {
                    outline: none;
                }

                &.active {
                    background-color: $active;
                }
            }

            label {
                position: absolute;
                right: 0;
                bottom: -30px;
                font-size: 22px;
                @include font-serif-bold;
            }
        }
    }
}
</style>
