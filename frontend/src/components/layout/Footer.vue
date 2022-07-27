<template>
    <div class="footer">
        <div class="col-left">
            <p>
                This site was made with
                <a class="vue-link" href="https://vuejs.org/">Vue.js</a> by me,
                Landon.
            </p>
        </div>
        <div class="col-right">
            <div class="social-links">
                <a href="#"><font-awesome-icon :icon="['fab', 'github']" /></a>
                <a href="#">
                    <font-awesome-icon :icon="['fab', 'linkedin']" />
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@@/assets/variables.scss';

.footer {
    background: $color-dark;
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;
    max-width: 100vw;

    .vue-link {
        color: #42b883;
    }

    .col-left {
        display: flex;
        align-items: center;
    }

    .social-links {
        a {
            color: #fff;
            font-size: 24px;
            padding: 0 10px;
        }
    }
}
</style>
