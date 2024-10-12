<script setup lang="ts">
import { RouterLink } from 'vue-router';

import ClubTag from '../ClubTag.vue';
import LoadingImage from '../LoadingImage.vue';

import Assets from '@/utils/Assets';
import { FormatAccuracy } from '@/utils/Formatting';
import type APIUser from '@/api/models/users/APIUser';

defineProps<{
    user: APIUser
}>();
</script>

<template>
    <RouterLink :to="`/u/${user.id}`"
                class="overlap-grid group rounded-xl bg-dark-2 first:h-72 h-80 last:h-64">
        <LoadingImage class="object-cover" :src="Assets.Banner(user)" />
        <div class="bg-dark-2 opacity-50"></div>
        <div class="flex items-center p-5 gap-2 flex-col drop-shadow-text">
            <div class="flex flex-col justify-center">
                <i class="fa fa-crown text-gold group-first:text-silver group-last:text-bronze"></i>
            </div>
            <LoadingImage
                class="flex-grow size-36 group-first:size-28 group-last:size-20 mb-1 object-cover rounded-xl bg-dark-3"
                :src="Assets.Avatar(user)" />
            <div class="h-full flex flex-col justify-center">
                <ClubTag :club="user.club" />
                <p class="text-lg leading-none">
                    {{ user.displayname || user.username }}
                    <span class="text-sm opacity-80" v-if="user.displayname">
                        {{ user.username }}
                    </span>
                </p>
            </div>
            <div>
                <p>{{ user.stats.ovr }} OVR</p>
                <div class="text-sm opacity-80 leading-none">
                    <span>
                        {{ user.stats.ptr }} PR • {{ FormatAccuracy(user.stats.ova) }}
                    </span>
                </div>
            </div>
        </div>

    </RouterLink>
</template>