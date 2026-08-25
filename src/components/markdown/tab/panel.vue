<script setup lang="ts">
defineProps<{
    title: string;
}>();

const active = inject('pnl-active');
const registered = (<any>inject('pnl-register'))();
</script>

<template>
    <div class="markdown-tab-panel" v-show="active == registered">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.markdown-tab-panel > pre {
    padding: 0px !important;
    margin: 0px !important;
}
</style>
