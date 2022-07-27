<script>
import WorkTimeline from '../components/WorkTimeline.vue';

export default {
    components: {
        WorkTimeline,
    },
};
</script>

<template>
    <div class="work-container">
        <h1>Work History</h1>
        <work-timeline width="1200"></work-timeline>
    </div>
</template>

<style lang="scss">
@import '@@/assets/variables.scss';

.work-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 60px;

    h1 {
        @include font-serif-bold;
    }
}
</style>
