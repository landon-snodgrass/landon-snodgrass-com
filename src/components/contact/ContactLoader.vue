<script>
export default {
    props: ['height'],
};
</script>

<template>
    <div class="loader-container" :style="{ height: height + 'px' }">
        <font-awesome-icon
            icon="envelope"
            size="xl"
            class="fa-bounce"
        ></font-awesome-icon>
    </div>
</template>

<style lang="scss">
.loader-container {
    display: flex;
    place-items: center;
    justify-content: center;
    font-size: 44px;
}
</style>
