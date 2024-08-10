<script setup>
import { reactive } from 'vue';

import ClubTag from '@/components/ClubTag.vue';

import API from '@/utils/API';
import Assets from '@/utils/Assets';
import Overlays from '@/utils/Overlays';
import { state } from '@/utils/State';

const react = reactive({
    clubs: []
});

API.get("/clubs").then(res => {
    if (res.status != 200) {
        alert(res.message);
        return;
    }

    react.clubs = res.data;
})
</script>

<template>
    <div>
        <div class="flex flex-row gap-2">
            <div class="flex-grow flex text-left bg-dark-2 mb-6 gap-3 p-4 rounded-xl">
                <div class="size-6 flex items-center justify-center">
                    <i class="fa fa-search text-xl"></i>
                </div>
                <input class="flex-grow bg-dark-2 focus:outline-none placeholder:text-white placeholder:opacity-60"
                    placeholder="Search... (doesn't actually work yet)" type="text">
            </div>
            <div v-if="state.user && !state.user.club" class="size-14 bg-dark-2 rounded-xl flex items-center justify-center transition-transform active:scale-90" @click="Overlays.OpenClubCreate">
                <i class="fa fa-plus text-2xl"></i>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <RouterLink
                class="flex flex-col w-full h-56 bg-dark-2 transition-all active:scale-95 hover:bg-dark-3 rounded-3xl"
                :to="`/club/${club.id}`" v-for="club in react.clubs">
                <img class="w-full h-36 object-cover rounded-3xl" :src="Assets.clubBanner(club.id)" animated-load>
                <div class="w-full flex-grow flex flex-row items-center p-4 gap-2 text-left">
                    <img class="size-12 object-cover rounded-lg" :src="Assets.clubIcon(club.id)" animated-load>
                    <div class="min-w-0 flex-grow">
                        <p class="truncate">
                            <ClubTag :club="club" class="text-sm inline" />
                            {{ club.name }}
                        </p>
                        <p class="text-xs opacity-80">{{ club.members || '??' }} members</p>
                    </div>
                </div>
            </RouterLink>
        </div>
    </div>
</template>