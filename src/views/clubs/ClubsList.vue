<script setup lang="ts">
import { reactive } from 'vue';

import type APIClub from '@/api/models/clubs/APIClub';

import ClubBanner from '@/components/images/ClubBanner.vue';
import ClubIcon from '@/components/images/ClubIcon.vue';
import ClubTag from '@/components/ClubTag.vue';

import API from '@/utils/API';
import Overlays from '@/utils/Overlays';
import Utils from '@/utils/Utils';
import { state } from '@/utils/State';

const react = reactive<{
    clubs?: APIClub[]
}>({});

Utils.SetTitle('club listing');

API.PerformGet<[APIClub]>('/clubs').then(res => {
    if (!res.IsSuccess()) {
        alert(res.message);
        return;
    }

    react.clubs = res.data;
});

function CanCreate() {
    return state.user && !state.user?.club;
}
</script>

<template>
    <div>
        <div class="flex flex-row gap-2">
            <div class="flex-grow flex text-left bg-dark-2 mb-6 gap-3 p-4 rounded-xl">
                <div class="size-6 flex items-center justify-center">
                    <i class="fa fa-search text-xl"></i>
                </div>
                <input class="flex-grow bg-dark-2 focus:outline-none placeholder:text-dark-text placeholder:opacity-60"
                       placeholder="Search... (doesn't actually work yet)" type="text">
            </div>
            <div v-if="CanCreate()" tabindex="0" role="button" aria-label="create club"
                 class="size-14 bg-dark-2 rounded-xl flex items-center justify-center transition-transform active:scale-90"
                 @click="Overlays.OpenClubCreate">
                <i class="fa fa-plus text-2xl"></i>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <RouterLink
                class="flex flex-col w-full h-56 bg-dark-2 transition-all active:scale-95 hover:bg-dark-3 rounded-3xl"
                :to="`/club/${club.id}`" v-for="club in react.clubs">
                <div class="w-full h-36">
                    <ClubBanner class="size-full object-cover rounded-3xl" :club="club" />
                </div>
                <div class="w-full flex-grow flex flex-row items-center p-4 gap-2 text-left">
                    <div class="size-12">
                        <ClubIcon class="size-full object-cover rounded-lg" :club="club" />
                    </div>
                    <div class="min-w-0 flex-grow">
                        <p class="truncate">
                            <ClubTag :club="club" class="text-sm inline" />
                            {{ club.name }}
                        </p>
                        <p class="text-xs opacity-80">{{ club.count || '??' }} {{ club.count > 1 ? 'members' : 'member'
                            }}</p>
                    </div>
                </div>
            </RouterLink>
        </div>
    </div>
</template>