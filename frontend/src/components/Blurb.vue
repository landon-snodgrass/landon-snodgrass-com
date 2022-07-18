<script>
export default {
    props: ['textSize'],
};
</script>

<template>
    <div class="blurb">
        <h2>
            <slot name="header"></slot>
        </h2>
        <p :class="textSize">
            <slot></slot>
        </p>
    </div>
</template>

<style lang="scss">
@import '@/assets/variables.scss';

.blurb {
    margin-left: 30px;
    margin-top: 40px;
    color: #fff;

    h2 {
        border: solid 5px $color-dark;
        border-bottom: none;
        padding: 10px;
        font-size: 28px;
        @include font-display;
        background: $color-dark;
        line-height: 80%;
        display: inline-block;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    p {
        background: $color-secondary-dark;
        @include font-serif-bold;
        font-size: 24px;
        padding: 5px 20px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
        border: solid 5px $color-dark;
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.16),
            3px 3px 3px rgba(0, 0, 0, 0.23);

        &.medium {
            font-size: 18px;
        }
    }

    &.text-medium {
        p {
            font-size: 20px;
        }
    }
}
</style>
