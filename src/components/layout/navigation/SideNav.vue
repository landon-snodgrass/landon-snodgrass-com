<script>
export default {
    data() {
        return {
            isHovered: false,
            menuItems: [
                {
                    title: 'Home',
                    path: '/',
                    icon: 'home',
                },
                {
                    title: 'About',
                    path: '/about',
                    icon: 'person',
                },
                {
                    title: 'Work',
                    path: '/work',
                    icon: 'work',
                },
                {
                    title: 'Contact',
                    path: '/contact',
                    icon: 'mail',
                },
            ],
            extraNavSpace: 0,
        };
    },
    mounted() {
        this.$refs.listItemTitles.forEach((item) => {
            const textWidth = item.clientWidth;
            this.extraNavSpace =
                this.extraNavSpace < textWidth ? textWidth : this.extraNavSpace;
        });
    },
    computed: {
        navWidth() {
            return this.isHovered ? this.extraNavSpace : 0;
        },
    },
    methods: {
        onSidenavHoverIn() {
            this.isHovered = true;
        },
        onSidenavHoverOut() {
            this.isHovered = false;
        },
    },
};
</script>

<template>
    <div class="sidenav-container">
        <div
            class="sidenav"
            :class="{ active: isHovered }"
            @mouseover="onSidenavHoverIn"
            @mouseleave="onSidenavHoverOut"
        >
            <ul class="menu">
                <li v-for="item in menuItems" class="list-item">
                    <router-link :to="item.path">
                        <i class="material-symbols-outlined">
                            {{ item.icon }}
                        </i>
                        <p ref="listItemTitles">{{ item.title }}</p>
                    </router-link>
                </li>
            </ul>
            <div class="expander" :style="{ width: navWidth + 'px' }"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sidenav-container {
    display: flex;
    place-items: center;

    .sidenav {
        background: #264653;
        color: #264653;
        font-size: 24px;
        display: block;
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.16),
            3px 3px 3px rgba(0, 0, 0, 0.23);
        margin-left: -3px;

        .expander {
            position: absolute;
            background: #264653;
            top: 0;
            bottom: 0;
            left: 100%;
            min-width: 5px;
            height: 100%;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            transition: all 0.25s ease-in-out 0.25s;
            z-index: 1;
            box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.16),
                3px 3px 3px rgba(0, 0, 0, 0.23);
        }

        .menu {
            list-style: none;
            padding: 0;
            display: inline-block;

            .list-item {
                padding: 20px;
                text-align: center;
                display: flex;
                place-items: center;

                a {
                    color: #2a9d8f;

                    &.router-link-active {
                        color: #e9c46a;
                    }

                    i {
                        transition: color 0.25s ease-in-out 0s;
                        display: inline-block;
                    }

                    p {
                        display: inline;
                        position: absolute;
                        margin-left: 10px;
                        padding-right: 10px;
                        opacity: 0;
                        transform: translateY(10px);
                        transition-property: opacity, transform, color;
                        transition-duration: 0.25s;
                        transition-delay: 0s;
                        transition-timing-function: ease-in-out;
                        z-index: 2;
                        text-decoration: none;
                        top: 0;
                        font-family: 'Cormorant Garamond', serif;
                    }
                }
            }
        }

        &.active {
            .expander {
                transition-delay: 0s;
            }

            .menu .list-item {
                a {
                    p {
                        opacity: 1;
                        transform: translateY(0);
                        transition-delay: 0.25s, 0.25s, 0;
                    }

                    &:hover {
                        color: #e9c46a;
                    }
                }
            }
        }
    }
}
</style>
