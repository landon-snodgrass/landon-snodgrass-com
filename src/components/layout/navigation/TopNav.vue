<script>
export default {
    data() {},
};
</script>

<template>
    <nav>
        <a href="#">
            <svg class="rectangle">
                <rect></rect>
            </svg>
            <span class="text" style="--transform-amount: 20px">Resume</span>
            <i class="material-symbols-outlined"> file_download </i>
        </a>
        <div class="logo flip-animate">
            <h1>Landon</h1>
            <p class="subtitle">Snodgrass</p>
        </div>
        <a href="#">
            <svg class="rectangle">
                <rect></rect>
            </svg>
            <i class="material-symbols-outlined" style="margin-left: 0">
                mail
            </i>
            <span class="text" style="--transform-amount: -20px">Contact</span>
        </a>
    </nav>
</template>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

nav {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    background: #264653;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    position: relative;
    z-index: 1;

    a {
        margin: 20px;
        color: #e9c46a;
        text-decoration: none;
        font-size: 24px;
        font-family: 'Cormorant Garamond', serif;
        font-weight: $font-weight-bold;
        padding: 5px 10px;
        transition: 0.5s;
        position: relative;
        display: flex;
        align-items: center;

        span {
            display: inline-block;
            transform: translateX(var(--transform-amount));
            transition: 0.25s;
        }

        i {
            margin: 0 10px;
            transform: translateY(20px);
            opacity: 0;
            transition: 0.25s;
            font-size: 32px;
        }

        svg.rectangle {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            height: 100%;
            width: 100%;
            z-index: 1;

            rect {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                height: 100%;
                width: 100%;
                fill: transparent;
                stroke: #e9c46a;
                stroke-width: 2px;
                stroke-dasharray: 520;
                stroke-dashoffset: 520;
                transition: 0.5s;
            }
        }

        &:hover {
            span.text {
                transform: translateX(0);
            }

            i {
                opacity: 1;
                transform: translateY(0);
            }

            svg.rectangle {
                rect {
                    stroke-dashoffset: 0;
                }
            }
        }
    }

    .logo {
        text-align: center;
        color: #e9c46a;
        padding: 6px;
        position: relative;
        margin-bottom: 2px;

        h1 {
            font-family: 'Fascinate', cursive;
            font-size: 32px;
            line-height: 36px;
            color: #e9c46a;
        }
        p.subtitle {
            font-family: 'Cormorant Garamond', serif;
            font-weight: $font-weight-bold;
            font-size: 24px;
            color: #e9c46a;
        }
    }
}
</style>
