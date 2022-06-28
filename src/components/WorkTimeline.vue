<script>
import { gsap } from 'gsap';

export default {
    props: ['width'],
    data() {
        return {
            workEntries: [
                {
                    slug: 'swiftpage-internship',
                    startDate: '05/18',
                    company: 'Swiftpage (Now ACT LLC)',
                    position: 'Web Development Intern',
                    description:
                        'I started my career with an internship at Swiftpage. I was hired to build React.js components for a new headless WordPress site that would replace their product site. I also redesigned the company site myself and worked heavily in the CMS Sitefinity.',
                },
                {
                    slug: 'swiftpage-fulltime',
                    startDate: '04/19',
                    company: 'Swiftpage (Now ACT LLC)',
                    position: 'Web Developer',
                    description:
                        'After a little under a year as an intern at Swiftpage, I was promoted to a full-time employee. I worked as the sole web developer (the old web developer left) maintaining the product and company sites. I worked heavily with the graphic designer to create seamless web experiences for users both internal and external.',
                },
                {
                    slug: 'gryphon',
                    startDate: '01/20',
                    company: 'Gryphon LLC',
                    position: 'Developer I',
                    description:
                        'At Gryphon, I worked heavily with our clients to help design their sites. My biggest project was working on the redesign of the AirForce site (af.mil). This position was much more team focused than my previous roles. We followed an Agile workflow and interacted with the client on a daily basis.',
                },
                {
                    slug: 'milestone',
                    startDate: '11/21',
                    company: 'Milestone - On Contract With Google',
                    position: 'Front-end Engineer',
                    description:
                        "Milestone brought me on to fulfill a front-end engineering position with Google. I worked on the Applied Digital Skills app in Google's education sector. It was an incredible learning experience not only for my front-end skills but for my vision of products. Google's investment in UI/UX is inspiring and it shows in their products.",
                },
            ],
            currentSpot: -1,
            currentProgress: -100,
            active: [],
        };
    },
    methods: {
        setActiveForward(index) {
            console.log(index);
            for (let i = index + 1; i < this.workEntries.length; i++) {
                this.active[i] = false;
            }
            this.active[index] = true;
        },
        setActiveBackward(index) {
            console.log(index, ' started');
        },
        getArrowPlacementAt(spot) {
            return spot * this.entryWidth + this.startEndWidth - this.dotWidth;
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
                    scale: 0,
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
                    scale: 1,
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
                : {};
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
                paddingRight: this.dotWidth + 'px',
            };
        },
    },
};
</script>

<template>
    <div class="timeline" :style="baseCss">
        <div class="entry-data-container">
            <div class="text-container">
                <p class="company">
                    {{ currentEntry.company }} |
                    {{ currentEntry.startDate }}
                </p>
                <p class="position">
                    {{ currentEntry.position }}
                </p>
                <p class="description">
                    {{ currentEntry.description }}
                </p>
            </div>
            <div class="arrow"></div>
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
                </div>
            </div>
            <div class="timeline-end">
                <progress class="timeline-line" max="100" value="0"></progress>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
$numDots: 20;
$parentWidthBase: 0.8;
$parentWidth: $parentWidthBase * 100vw;
$parentMaxWidth: 1000px;
$dotWidth: 25px;
$active: #2c3e50;
$inactive: #aeb6bf;

.timeline {
    display: flex;
    flex-direction: column;

    .entry-data-container {
        background: $active;
        border-radius: 5px;
        color: #fff;
        padding: 20px;
        margin-bottom: 30px;

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
                //transition: 0.3s;
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
        }
    }
}
</style>
