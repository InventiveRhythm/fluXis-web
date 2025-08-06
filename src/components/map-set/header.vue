<script setup lang="ts">
import type { APIMapSet } from '~/models/maps/APIMapSet';
import Assets from '~/utils/assets';

defineProps<{
    mapset: APIMapSet;
}>();
</script>

<template>
    <div class="overlap-grid h-72 w-full rounded-b-3xl xl:rounded-3xl">
        <LoadingImage class="object-cover" :src="Assets.Background(mapset.id, true)" :low="Assets.BackgroundPreview(mapset.id)" />
        <div class="bg-dark-2/50"></div>
        <div class="flex flex-col items-center justify-center">
            <div class="flex w-full max-w-[1200px] flex-col items-center justify-center px-10">
                <div class="flex h-40 w-full flex-col items-center justify-center gap-3 text-center md:flex-row md:text-left">
                    <LoadingImage
                        class="size-24 flex-shrink-0 rounded-2xl object-cover md:size-40"
                        :src="Assets.Cover(mapset.id, true)"
                        :low="Assets.CoverPreview(mapset.id)"
                    />
                    <div class="flex flex-1 flex-col items-start justify-center gap-1">
                        <div class="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
                            <StatusChip :status="mapset.status" />
                            <p class="text-xs md:text-base"><span class="opacity-80">uploaded on</span> {{ formatting.Date(mapset.submitted) }}</p>
                        </div>
                        <p class="line-clamp-1 w-full text-2xl leading-none md:text-4xl">{{ mapset.title }}</p>
                        <p class="line-clamp-1 w-full text-base leading-none md:text-2xl">{{ mapset.artist }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
