<script setup>
import { reactive } from 'vue';

const react = reactive({
    loaded: false
});
</script>

<template>
    <Transition name="image-fade">
        <img v-show="react.loaded" loading="eager" @load="react.loaded = true" />
    </Transition>
</template>

<style>
.image-fade-enter-active {
    transition: all 400ms;
    position: relative;
}

.image-fade-enter-from {
    opacity: 0;
}
</style>