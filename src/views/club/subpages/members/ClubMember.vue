<script setup>
import { RouterLink } from 'vue-router';

import LoadingImage from '@/components/LoadingImage.vue';

import Assets from '@/utils/Assets';
import Overlays from '@/utils/Overlays';
import TimeUtils from '@/utils/TimeUtils';

defineProps({
    club: Object,
    member: Object
});

function getOnlineStatus(member) {
    if (member.online)
        return "online";

    if (!member.lastlogin)
        return "";

    return `last online ${TimeUtils.formatAgo(member.lastlogin)}`;
}

function OpenContext(e) {
    Overlays.OpenMenu(e.clientX, e.clientY, [{
        text: "Remove",
        icon: "fa fa-door-open",
        classes: 'text-red hover:bg-red',
        action: () => { }
    }])
}
</script>

<template>
    <RouterLink :to="`/u/${member.id}`" class="w-full flex flex-row items-center gap-2" @contextmenu.prevent="OpenContext">
        <div class="size-12">
            <LoadingImage class="size-full object-cover rounded-lg" :src="Assets.Avatar(member.id)" />
        </div>
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