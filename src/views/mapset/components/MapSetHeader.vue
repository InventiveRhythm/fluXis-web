<script setup>
import LoadingImage from '@/components/LoadingImage.vue';
import StatusChip from './StatusChip.vue';

import Assets from '@/utils/Assets';
import TimeUtils from '@/utils/TimeUtils';

const props = defineProps({
    set: Object
});
</script>

<template>
    <div class="overlap-grid w-full h-96 md:h-72 rounded-b-3xl xl:rounded-3xl">
        <LoadingImage class="object-cover" :src="Assets.Background(set.id)" />
        <div class="bg-dark-2 bg-opacity-50"></div>
        <div class="flex flex-col items-center justify-center">
            <div class="w-full max-w-[1200px] px-10 flex flex-col items-center justify-center">
                <div class="w-full md:h-40 flex flex-col md:flex-row items-center self-start gap-3">
                    <LoadingImage class="size-32 md:size-40 rounded-2xl object-cover shadow-md" :src="Assets.Cover(set.id)" />
                    <div class="flex-1 flex flex-col justify-center items-start drop-shadow-text gap-1 text-center md:text-left">
                        <div class="w-full flex flex-col md:flex-row gap-2 items-center justify-between">
                            <StatusChip :status="set.status" />
                            <div class="text-base">
                                <span class="opacity-80">Uploaded on</span>
                                {{ TimeUtils.formatDate(set.submitted) }}
                            </div>
                        </div>
                        <p class="w-full text-4xl line-clamp-1">{{ set.title }}</p>
                        <p class="w-full text-2xl line-clamp-1">{{ set.artist }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>