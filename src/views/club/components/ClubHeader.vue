<script setup>
import ClubTag from '@/components/ClubTag.vue';
import LoadingImage from '@/components/LoadingImage.vue';

import Assets from '@/utils/Assets';

const props = defineProps({
    club: Object
});
</script>

<template>
    <div class="overlap-grid w-full h-44 rounded-2xl">
        <LoadingImage class="object-cover" :src="Assets.ClubBanner(club)" />
        <div class="bg-dark-2 opacity-50"></div>
        <div class="flex flex-col items-center justify-center">
            <div class="w-full max-w-[960px] px-10 flex flex-row items-center justify-start gap-5">
                <div class="size-32">
                    <LoadingImage class="size-full rounded-xl shadow-normal" :src="Assets.ClubIcon(club)" />
                </div>
                <div class="flex-1 flex flex-col text-left">
                    <div class="w-full flex gap-1.5 items-center">
                        <ClubTag class="text-xl" :club="club" />
                        <p class="text-3xl line-clamp-1">{{ club.name }}</p>
                    </div>
                    <p class="opacity-80">{{ club.members.length }} member{{ club.members.length > 1 ? "s" : "" }}</p>
                </div>
            </div>
        </div>
    </div>
</template>