<script setup lang="ts">
const slots = useSlots();
const tabs = computed(() => (slots.default ? slots.default() : []));

const index = ref<number>(0);
provide('pnl-active', index);

const registered = ref<number>(0);
provide('pnl-register', () => {
    const idx = registered.value;
    registered.value++;
    return idx;
});
</script>

<template>
    <div class="w-full overflow-hidden rounded-lg border-2 border-dark-6">
        <div class="flex flex-row gap-2 border-b-2 border-dark-6 p-2">
            <div
                class="flex cursor-pointer flex-row items-center rounded-md bg-dark-text bg-opacity-0 px-3 pb-2 pt-3 leading-none text-dark-text transition-all duration-200 hover:bg-opacity-20 hover:duration-50"
                v-for="(tab, idx) in tabs"
                @click="index = idx"
                :class="{ 'text-opacity-60': idx != index }"
            >
                <span>{{ tab.props?.title }}</span>
            </div>
        </div>
        <div class="bg-dark-2 p-3">
            <slot />
        </div>
    </div>
</template>
