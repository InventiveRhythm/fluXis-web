<script setup>
import LoadingImage from '@/components/LoadingImage.vue';
import ClubTag from '@/components/ClubTag.vue';

import Assets from '@/utils/Assets';

defineProps({
    mapper: Object
});
</script>

<template>
    <RouterLink :to="`/u/${mapper.id}`" class="overlap-grid text-left w-full h-12 bg-dark-2 rounded-lg">
        <LoadingImage class="object-cover" :src="Assets.Banner(mapper)" />
        <div class="bg-dark-2 opacity-50"></div>
        <div class="flex flex-row items-center gap-2 pr-2">
            <div class="size-12">
                <LoadingImage class="size-full rounded-lg object-cover" :src="Assets.Avatar(mapper)" />
            </div>
            <p class="flex-1 text-sm line-clamp-1 drop-shadow-text">
                <ClubTag class="inline text-xs" :club="mapper.club" />
                {{ mapper.displayname || mapper.username }}
            </p>
        </div>
    </RouterLink>
</template>