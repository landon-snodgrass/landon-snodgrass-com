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
        <work-timeline width="1200"></work-timeline>
    </div>
</template>

<style lang="scss">
.work-container {
    display: flex;
    justify-content: center;
    margin-top: 60px;
}
</style>
