<script setup>
import LoadingImage from '@/components/LoadingImage.vue';
import ClubTag from '@/components/ClubTag.vue';

import Assets from '@/utils/Assets';

defineProps({
    score: Object,
    idx: Number
});
</script>

<template>
    <div class="overlap-grid w-full h-12 bg-dark-2 rounded-lg">
        <LoadingImage class="object-cover" :src="Assets.Banner(score.user)" />
        <div class="bg-dark-2 opacity-50"></div>
        <div class="flex flex-row">
            <p class="text-sm size-12 flex flex-col justify-center">
                #{{ idx + 1 }}
            </p>
            <div class="size-12">
                <LoadingImage class="size-full object-cover rounded-lg" :src="Assets.Avatar(score.user)" />
            </div>
            <div class="flex-1 text-left flex flex-row items-center justify-between p-3">
                <div class="flex flex-col gap-1">
                    <p class="leading-none">
                        <span :class="`fi fi-${score.user.country} flag text-xs leading-none`"></span>
                        <ClubTag class="inline text-sm leading-none ml-1" :club="score.user.club" />
                        {{ score.user.username }}
                    </p>
                    <p class="text-xs leading-none">
                        <span v-if="score.mods">{{ score.mods }} · </span>
                        {{ score.accuracy.toFixed(2) }}% {{ score.maxcombo }}x
                    </p>
                </div>
                <div class="flex flex-col text-right gap-1">
                    <p class="text-sm leading-none">{{ score.pr.toFixed(2) }}pr</p>
                    <p class="text-xs leading-none opacity-80">{{ score.score }}</p>
                </div>
            </div>
        </div>
    </div>
</template>