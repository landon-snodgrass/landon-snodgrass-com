<script>
export default {
    data() {
        return {
            workEntries: {
                swiftpageInternship: {
                    startDate: '05/18',
                    company: 'Swiftpage (Now ACT LLC)',
                    position: 'Web Development Intern',
                    description:
                        'I started my career with an internship at Swiftpage. I was hired to build React.js components for a new headless WordPress site that would replace their product site. I also redesigned the company site myself and worked heavily in the CMS Sitefinity.',
                },
                swiftpageFulltime: {
                    startDate: '04/19',
                    company: 'Swiftpage (Now ACT LLC)',
                    position: 'Web Developer',
                    description:
                        'After a little under a year as an intern at Swiftpage, I was promoted to a full-time employee. I worked as the sole web developer (the old web developer left) maintaining the product and company sites. I worked heavily with the graphic designer to create seamless web experiences for users both internal and external.',
                },
                gryphon: {
                    startDate: '01/20',
                    company: 'Gryphon LLC',
                    position: 'Developer I',
                    description:
                        'At Gryphon, I worked heavily with our clients to help design their sites. My biggest project was working on the redesign of the AirForce site (af.mil). This position was much more team focused than my previous roles. We followed an Agile workflow and interacted with the client on a daily basis.',
                },
                milestone: {
                    startDate: '11/21',
                    company: 'Milestone - On Contract With Google',
                    positon: 'Front-end Engineer',
                    description:
                        "Milestone brought me on to fulfill a front-end engineering position with Google. I worked on the Applied Digital Skills app in Google's education sector. It was an incredible learning experience not only for my front-end skills but for my vision of products. Google's investment in UI/UX is inspiring and it shows in their products.",
                },
            },
        };
    },
};
</script>

<template>
    <!-- THE CHALLENGE: -->
    <!-- 1. recreate version 3 (https://codepen.io/cjl750/pen/mXbMyo) with no javascript whatsoever
     2. make code as abstract as possible (e.g., trying to calc positions that would work with any number of dots instead of hard-coding the container width as we do in our media queries)
     3. highest browser support possible -->
    <!-- Bonus points: turn v3's pseudo content into actual element content, so it's accessible to screen readers, search engines, etc. -->

    <h1>Notable inventions, <span>1910–2000</span></h1>
    <div class="flex-parent">
        <div class="input-flex-container">
            <input type="radio" name="timeline-dot" data-description="1910" />
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
            </div>
            <div id="timeline-descriptions-wrapper">
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

.flex-parent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 500px;
}

.input-flex-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    width: $parentWidth;
    max-width: $parentMaxWidth;
    position: relative;
    z-index: 0;
    margin-left: calc((#{$parentWidth} - #{$dotWidth}) / $numDots);
}

input {
    width: $dotWidth;
    height: $dotWidth;
    background-color: $active;
    position: relative;
    border-radius: 50%;
    display: block;
    appearance: none;
    cursor: pointer;
    &:focus {
        outline: none;
    }
    &:before,
    &:after {
        content: '';
        display: block;
        position: absolute;
        z-index: -1;
        top: 50%;
        transform: translateY(-50%);
        background-color: $active;
        width: calc(#{$parentWidth} / #{$numDots});
        height: 5px;
        max-width: calc(#{$parentMaxWidth} / #{$numDots});
    }

    &:before {
        left: calc((-#{$parentWidth} / #{$numDots}) + ($dotWidth / 2));
    }

    &:after {
        right: calc((-#{$parentWidth} / #{$numDots}) + ($dotWidth / 2));
    }

    &:checked {
        background-color: $active;

        &:before {
            background-color: $active;
        }

        &:after {
            background-color: $inactive;
        }
    }

    &:checked ~ input {
        &,
        &:before,
        &:after {
            background-color: $inactive;
        }
    }

    &:checked + .dot-info {
        span {
            font-size: 13px;
            font-weight: bold;
        }
    }
}

.dot-info {
    width: $dotWidth;
    height: $dotWidth;
    display: block;
    visibility: hidden;
    position: relative;
    z-index: -1;
    left: calc((((#{$parentWidth} - #{$dotWidth}) / $numDots) * -1) - 1px);

    span {
        visibility: visible;
        position: absolute;
        font-size: 12px;
        &.year {
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
        }

        &.label {
            top: -65px;
            left: 0;
            transform: rotateZ(-45deg);
            width: 70px;
            text-indent: -10px;
        }
    }
}

#timeline-descriptions-wrapper {
    width: 100%;
    margin-top: 140px;
    font-size: 22px;
    font-weight: 400;
    margin-left: calc((-#{$parentWidth} - #{$dotWidth}) / $numDots);

    p {
        margin-top: 0;
        display: none;
    }
}
</style>
