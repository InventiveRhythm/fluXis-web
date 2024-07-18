<script setup>
import { RouterLink } from 'vue-router';

import Assets from '@/utils/Assets';
import TimeUtils from '@/utils/TimeUtils'

defineProps({
    club: Object
});

function getOnlineStatus(member) {
    if (member.online)
        return "online";

    if (!member.lastlogin)
        return "";

    return `last online ${TimeUtils.formatAgo(member.lastlogin)}`;
}
</script>

<template>
    <RouterLink :to="`/u/${member.id}`" class="flex flex-row items-center gap-2" v-for="member in club.members">
        <img class="object-cover size-12 rounded-lg" :src="Assets.avatar(member.id)" animated-load>
        <div class="flex flex-col">
            <div class="flex gap-1.5">
                <p v-if="member.displayname">
                    <i class="fa-solid fa-crown" v-if="club.owner.id == member.id"></i>
                    {{ member.displayname }}
                    <span class="text-sm opacity-80">
                        {{ member.username }}
                    </span>
                </p>
                <p v-else>
                    <i class="fa-solid fa-crown" v-if="club.owner.id == member.id"></i>
                    {{ member.username }}
                </p>
            </div>
            <p class="text-2xs">{{ getOnlineStatus(member) }}</p>
        </div>
    </RouterLink>
</template>