<script setup lang="ts">
const props = defineProps<{
    mode: number,
    difficulty: number
}>();
</script>

<template>
    <div :class="'key-mode-icon count-' + mode">
        <div v-for="_ in mode"></div>
    </div>
</template>

<style lang="scss">
.key-mode-icon {
    position: relative;
    align-items: center;

    > * {
        --pos-x: 0px;
        --pos-y: 0px;
        top: 50%;
        left: 50%;
        transform: translate(calc(-50% + var(--pos-x)), calc(-50% + var(--pos-y)));
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 100%;
        background-color: white;
        overflow: hidden;
    }

    &.count-4 {
        > * {
            background-color: var(--tag-keymode-4);

            &:nth-child(1) {
                --pos-x: -6px;
                --pos-y: -6px;
            }

            &:nth-child(2) {
                --pos-x: -6px;
                --pos-y: 6px;
            }

            &:nth-child(3) {
                --pos-x: 6px;
                --pos-y: -6px;
            }

            &:nth-child(4) {
                --pos-x: 6px;
                --pos-y: 6px;
            }
        }
    }

    &.count-5 {
        > * {
            background-color: var(--tag-keymode-5);

            &:nth-child(1) {
                --pos-x: -9px;
                --pos-y: -9px;
            }

            &:nth-child(2) {
                --pos-x: 9px;
                --pos-y: -9px;
            }

            &:nth-child(4) {
                --pos-x: -9px;
                --pos-y: 9px;
            }

            &:nth-child(5) {
                --pos-x: 9px;
                --pos-y: 9px;
            }
        }
    }

    &.count-6 {
        > * {
            background-color: var(--tag-keymode-6);

            &:nth-child(1) {
                --pos-x: -6px;
                --pos-y: -11px;
            }

            &:nth-child(2) {
                --pos-x: 6px;
                --pos-y: -11px;
            }

            &:nth-child(3) {
                --pos-x: -12px;
                --pos-y: 0px;
            }

            &:nth-child(4) {
                --pos-x: 12px;
                --pos-y: 0px;
            }

            &:nth-child(5) {
                --pos-x: 6px;
                --pos-y: 11px;
            }

            &:nth-child(6) {
                --pos-x: -6px;
                --pos-y: 11px;
            }
        }
    }

    &.count-7 {
        > * {
            background-color: var(--tag-keymode-7);

            &:nth-child(1) {
                --pos-x: -6px;
                --pos-y: -11px;
            }

            &:nth-child(2) {
                --pos-x: 6px;
                --pos-y: -11px;
            }

            &:nth-child(3) {
                --pos-x: -12px;
                --pos-y: 0px;
            }

            &:nth-child(5) {
                --pos-x: 12px;
                --pos-y: 0px;
            }

            &:nth-child(6) {
                --pos-x: 6px;
                --pos-y: 11px;
            }

            &:nth-child(7) {
                --pos-x: -6px;
                --pos-y: 11px;
            }
        }
    }
}
</style>