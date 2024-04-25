<script setup>
const props = defineProps({
    club: Object
});

function createClubGradient() {
    if (!props.club) return;
    const colors = props.club.colors;

    let gradient = "linear-gradient(90deg";

    colors.forEach(el => {
        let color = el.color;
        let position = el.position;

        gradient += `, ${color} ${position * 100}%`;
    });

    gradient += ")";
    return gradient;
}
</script>

<template>
    <p class="club-tag" v-if="club">
        <span :style="'background-image: ' + createClubGradient()">{{ club.tag }}</span>
    </p>
</template>

<style lang="scss">
.club-tag {
    color: var(--text-color);

    &::before {
        content: '[';
    }

    span {
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    &::after {
        content: ']';
    }
}
</style>