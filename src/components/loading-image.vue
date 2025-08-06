<script setup lang="ts">
const loaded = ref(false);
const img = ref<InstanceType<typeof HTMLImageElement>>();

const props = defineProps<{
    low?: string;
}>();

if (import.meta.server && props.low) {
    useHead({
        link: [
            {
                rel: 'preload',
                as: 'image',
                href: props.low
            }
        ]
    });
}

if (import.meta.client) {
    onMounted(() => {
        if (img.value) {
            const i = img.value;

            if (i.complete) {
                loaded.value = true;
                return;
            }

            i.onload = () => (loaded.value = true);
        }
    });
}
</script>

<template>
    <div class="overlap-grid" v-if="low">
        <img class="size-full object-cover" loading="eager" :src="low" />
        <img ref="img" class="size-full opacity-0 transition-opacity" :class="{ 'opacity-100': loaded }" loading="lazy" v-bind="$attrs" />
    </div>
    <img ref="img" class="opacity-0 transition-opacity" loading="lazy" :class="{ 'opacity-100': loaded }" v-else />
</template>
