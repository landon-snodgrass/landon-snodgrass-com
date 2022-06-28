<script>
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
            animOffset: 0,
        };
    },
    methods: {
        tween(start, end) {
            let frameHandler;

            const animate = function (currentTime) {
                TWEEN.update(currentTime);
                frameHandler = requestAnimationFrame(animate);
            };

            const myTween = new TWEEN.Tween({ tweeningValue: start })
                .to({ tweeningValue: end }, this.tweenDuration)
                .onComplete(() => {
                    cancelAnimationFrame(frameHandler);
                })
                .start();

            frameHandler = requestAnimationFrame(animate);
        },
    },
    watch: {
        currentProgress(newVal, oldVal) {
            this.tweenDuration = Math.abs(newVal - oldVal) * 150;
            this.tween(oldVal, newVal);
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
        timelineStarted() {
            return this.currentProgress >= 0;
        },
        currentProgress() {
            return this.currentSpot * 100;
        },
        baseCss() {
            return {
                '--dot-width': this.dotWidth + 'px',
                '--entry-width': this.entryWidth + 'px',
                '--line-width': this.lineWidth + 'px',
                '--start-end-width': this.startEndWidth + 'px',
                width: this.width + 'px',
                paddingRight: this.dotWidth + 'px',
            };
        },
    },
};
</script>

<template>
    <h1>{{ currentProgress }}</h1>
    <div class="timeline" :style="baseCss">
        <div class="timeline-container">
            <div class="timeline-start">
                <progress
                    class="timeline-line"
                    max="100"
                    :value="timelineStarted ? 100 : 0"
                ></progress>
            </div>
            <div
                class="entry-container"
                v-for="(entry, index) in workEntries"
                :key="index"
            >
                <progress
                    class="timeline-line"
                    max="100"
                    :value="currentProgress >= index ? 100 : 0"
                    v-if="index > 0"
                    :style="{
                        width: lineWidth,
                        transitionDelay:
                            (index - currentProgress - 1) * 0.25 + 's',
                    }"
                ></progress>
                <input
                    type="radio"
                    class="timeline-dot"
                    :class="{ active: currentProgress >= index }"
                    :value="index"
                    :id="'dot-' + index"
                    :data-entry="index"
                    v-model="currentSpot"
                />

                <!-- <div class="dot-info" :data-description="entry.startDate">
                    <span class="year">{{ entry.startDate }}</span>
                    <span class="label">{{ entry.position }}</span>
                </div> -->
            </div>
            <div class="timeline-end">
                <progress class="timeline-line" max="100" value="0"></progress>
            </div>
            <!-- <input type="radio" name="timeline-dot" data-description="1910" />
            <div class="dot-info" data-description="1910">
                <span class="year">1910</span>
                <span class="label">headset</span>
            </div>
            <input type="radio" name="timeline-dot" data-description="1920" />
            <div class="dot-info" data-description="1920">
                <span class="year">1920</span>
                <span class="label">jungle gym</span>
            </div>
            <input
                type="radio"
                name="timeline-dot"
                data-description="1930"
                checked
            />
            <div class="dot-info" data-description="1930">
                <span class="year">1930</span>
                <span class="label">chocolate chip cookie</span>
            </div>
            <input type="radio" name="timeline-dot" data-description="1940" />
            <div class="dot-info" data-description="1940">
                <span class="year">1940</span>
                <span class="label">Jeep</span>
            </div>
            <input type="radio" name="timeline-dot" data-description="1950" />
            <div class="dot-info" data-description="1950">
                <span class="year">1950</span>
                <span class="label">leaf blower</span>
            </div>
            <input type="radio" name="timeline-dot" data-description="1960" />
            <div class="dot-info" data-description="1960">
                <span class="year">1960</span>
                <span class="label">magnetic stripe card</span>
            </div>
            <input type="radio" name="timeline-dot" data-description="1970" />
            <div class="dot-info" data-description="1970">
                <span class="year">1970</span>
                <span class="label">wireless LAN</span>
            </div>
            <input type="radio" name="timeline-dot" data-description="1980" />
            <div class="dot-info" data-description="1980">
                <span class="year">1980</span>
                <span class="label">flash memory</span>
            </div>
            <input type="radio" name="timeline-dot" data-description="1990" />
            <div class="dot-info" data-description="1990">
                <span class="year">1990</span>
                <span class="label">World Wide Web</span>
            </div>
            <input type="radio" name="timeline-dot" data-description="2000" />
            <div class="dot-info" data-description="2000">
                <span class="year">2000</span>
                <span class="label">Google AdWords</span>
            </div> -->
            <!-- <div id="timeline-descriptions-wrapper">
                <p data-description="1910">
                    And future Call of Duty players would thank them.
                </p>
                <p data-description="1920">
                    Because every kid should get to be Tarzan for a day.
                </p>
                <p data-description="1930">And the world rejoiced.</p>
                <p data-description="1940">
                    Because building roads is inconvenient.
                </p>
                <p data-description="1950">Ain’t nobody got time to rake.</p>
                <p data-description="1960">
                    Because paper currency is for noobs.
                </p>
                <p data-description="1970">Nobody likes cords. Nobody.</p>
                <p data-description="1980">Brighter than glow memory.</p>
                <p data-description="1990">
                    To capitalize on an as-yet nascent market for cat photos.
                </p>
                <p data-description="2000">
                    Because organic search rankings take work.
                </p>
            </div> -->
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
                transition: 0.3s;
            }
        }
    }

    .timeline-start,
    .timeline-end {
        width: var(--start-end-width);

        & ~ .entry-container {
            justify-content: flex-end;
        }
    }

    .entry-container {
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
</style>
