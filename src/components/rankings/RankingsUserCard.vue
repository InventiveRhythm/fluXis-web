<script setup>
import { RouterLink } from 'vue-router';

import ClubTag from '../ClubTag.vue';
import LoadingImage from '../LoadingImage.vue';

import Assets from '@/utils/Assets';
import { formatAccuracy } from '@/utils/formatting';
import Utils from '@/utils/Utils';

defineProps({
    user: Object
});
</script>

<template>
    <RouterLink :to="'/u/' + user.id" class="w-full h-20 overlap-grid rounded-xl overflow-hidden">
        <LoadingImage :src="Assets.Banner(user.id)" class="size-full object-cover" />
        <div class="bg-dark-2 opacity-50"></div>
        <div class="flex items-center">
            <div class="flex size-20 items-center justify-center text-xl drop-shadow-text">
                #{{ user.stats.global }}
            </div>
            <div class="size-20">
                <LoadingImage :src="Assets.Avatar(user.id)" class="size-full object-cover rounded-xl" />
            </div>
            <div class="flex flex-grow px-4 justify-between items-center drop-shadow-text">
                <div class="flex flex-col text-left">
                    <span class="flex gap-2 items-center text-xl">
                        <ClubTag :club="user.club" class="text-lg" />
                        {{ user.displayname || user.username }}
                        <span class="text-base opacity-80" v-if="user.displayname">
                            {{ user.username }}
                        </span>
                    </span>
                    <span>
                        <span :class="'fi fi-' + user.country + ' h-fit rounded-sm'"></span>
                        {{ Utils.GetCountryName(user.country) }}
                    </span>
                </div>
                <div class="text-right">
                    <span class="text-xl leading-none">
                        {{ user.stats.ovr }} OVR
                    </span>
                    <div class="text-sm opacity-80 leading-none">
                        <span>
                            {{ user.stats.ptr }} PR • {{ formatAccuracy(user.stats.ova) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </RouterLink>
</template>