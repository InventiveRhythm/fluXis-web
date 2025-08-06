<script setup lang="ts">
import type APIUser from '~/models/users/APIUser';
import Assets from '~/utils/assets';

defineProps<{
    mapper: APIUser;
}>();
</script>

<template>
    <NuxtLink :to="`/u/${mapper.id}`" class="overlap-grid h-12 w-full rounded-lg bg-dark-2 text-left">
        <LoadingImage class="object-cover" :src="Assets.Banner(mapper)" />
        <div class="bg-dark-2 opacity-50"></div>
        <div class="flex flex-row items-center gap-2 pr-2">
            <LoadingImage class="size-12 rounded-lg object-cover" :src="Assets.Avatar(mapper)" />
            <p class="line-clamp-1 flex-1 text-sm">
                <ClubTag class="inline text-xs" :club="mapper.club" />
                {{ mapper.displayname || mapper.username }}
            </p>
        </div>
    </NuxtLink>
</template>
