<script setup lang="ts">
import type APIClub from '~/models/clubs/APIClub';

const props = defineProps<{
    club?: APIClub;
}>();

function CreateGradient() {
    if (!props.club) return;
    const colors = props.club.colors;

    let gradient = 'linear-gradient(90deg';

    colors.forEach((el: any) => {
        let color = el.color;
        let position = el.position;

        gradient += `, ${color} ${position * 100}%`;
    });

    gradient += ')';
    return gradient;
}
</script>

<template>
    <p class="club-tag" v-if="club">
        <span :style="'background-image: ' + CreateGradient()">{{ club.tag }}</span>
    </p>
</template>

<style>
.club-tag {
    color: var(--text-color);
}

.club-tag::before {
    content: '[';
}

.club-tag span {
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.club-tag::after {
    content: ']';
}
</style>
