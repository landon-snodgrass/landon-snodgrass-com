<template>
    <nav>
        <a
            href="https://ik.imagekit.io/wwxxpwqes/George_Landon_Snodgrass_Resume_UgVu27VG-.pdf?ik-sdk-version=javascript-1.4.3&updatedAt=1658169605329"
            target="_blank"
            rel="noreferrer"
        >
            <svg class="rectangle">
                <path
                    d="M 0 0 L 145 0 L 145 49 L 0 49 Z"
                    fill="transparent"
                    stroke="#e9c46a"
                    stroke-width="2px"
                />
            </svg>
            <span class="text" style="--transform-amount: 20px">Resume</span>
            <i class="material-symbols-outlined"> file_download </i>
        </a>
        <router-link class="logo" to="/">
            <h1>Landon</h1>
            <p class="subtitle">Snodgrass</p>
        </router-link>
        <router-link to="/contact">
            <svg class="rectangle" width="145" height="49">
                <path
                    d="M 0 0 L 145 0 L 145 49 L 0 49 Z"
                    fill="transparent"
                    stroke="#e9c46a"
                    stroke-width="2px"
                />
            </svg>
            <i class="material-symbols-outlined" style="margin-left: 0">
                mail
            </i>
            <span class="text" style="--transform-amount: -20px">Contact</span>
        </router-link>
    </nav>
</template>

<style lang="scss" scoped>
@import '@@/assets/variables.scss';

nav {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    background: $color-dark;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    position: relative;
    z-index: 1;
    max-width: 100vw;

    a:not(.logo) {
        margin: 20px;
        color: $color-gold;
        text-decoration: none;
        font-size: 24px;
        @include font-serif-bold;
        padding: 5px 10px;
        transition: 0.5s;
        position: relative;
        width: 145px;
        height: 49px;
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

            path {
                stroke-dasharray: 400;
                stroke-dashoffset: 400;
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
                path {
                    stroke-dashoffset: 0;
                }
            }
        }
    }

    .logo {
        text-align: center;
        color: $color-gold;
        padding: 6px;
        position: relative;
        margin-bottom: 2px;
        text-decoration: none;

        h1 {
            @include font-display;
            font-size: 32px;
            line-height: 36px;
            color: $color-gold;
            background-image: linear-gradient($color-gold 0 0);
            background-size: 200% 5px;
            background-position: 200% 100%;
            background-repeat: no-repeat;
            transition: 0.25s;
            text-decoration: none;
        }
        p.subtitle {
            @include font-serif-bold;
            font-size: 24px;
            color: $color-gold;
            background-image: linear-gradient($color-gold 0 0);
            background-size: 200% 5px;
            background-position: 200% 100%;
            background-repeat: no-repeat;
            transition: 0.25s;
            text-decoration: none;
        }

        &:hover {
            cursor: pointer;
            h1 {
                background-position: 100% 100%;
            }

            p.subtitle {
                letter-spacing: 2px;
            }
        }
    }
}
</style>
