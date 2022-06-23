<script>
export default {
    props: ['skillList'],
};
</script>

<template>
    <div class="component-skills-container">
        <span
            class="tooltip"
            :data-text="skill.name"
            :key="skill.name"
            v-for="skill in skillList"
        >
            <font-awesome-icon :icon="skill.icon" class="skills-icon" />
        </span>
    </div>
</template>

<style lang="scss" scoped>
.component-skills-container {
    display: flex;
    padding: 20px;
    justify-content: space-around;
}
</style>
