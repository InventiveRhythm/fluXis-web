<script setup lang="ts">
import { RouterLink } from 'vue-router';

import type APIClub from '@/api/models/clubs/APIClub';
import type APIUser from '@/api/models/users/APIUser';

import UserAvatar from '@/components/images/UserAvatar.vue';

import { EmitEvent } from '@/utils/Events';
import Overlays from '@/utils/Overlays';
import { state } from '@/utils/State';
import TimeUtils from '@/utils/TimeUtils';
import Utils from '@/utils/Utils';

const props = defineProps<{
    club: APIClub
    member: APIUser
}>();

function getOnlineStatus(member) {
    if (member.online)
        return 'online';

    if (!member.lastlogin)
        return '';

    return `last online ${TimeUtils.formatAgo(member.lastlogin)}`;
}

function CanKick() {
    if (!state.user)
        return false;

    if (props.member.id == props.club.owner?.id)
        return false;

    return state.user?.id == props.club.owner?.id || Utils.IsDeveloper(state.user);
}

function OpenContext(e) {
    let items = [];

    if (CanKick()) {
        items.push({
            text: 'Remove',
            icon: 'fa fa-door-open',
            classes: 'text-red hover:bg-red',
            action: () => EmitEvent('club-kick-overlay', { club: props.club, user: props.member })
        });
    }

    Overlays.OpenMenu(e.clientX, e.clientY, items);
}
</script>

<template>
    <RouterLink :to="`/u/${member.id}`" class="w-full flex flex-row items-center gap-2"
                @contextmenu.prevent="OpenContext">
        <div class="size-12">
            <UserAvatar class="size-full object-cover rounded-lg" :user="member" />
        </div>
        <div class="flex flex-col">
            <div class="flex gap-1.5">
                <p v-if="member.displayname">
                    <i class="fa-solid fa-crown" v-if="club.owner?.id == member.id"></i>
                    {{ member.displayname }}
                    <span class="text-sm opacity-80">
                        {{ member.username }}
                    </span>
                </p>
                <p v-else>
                    <i class="fa-solid fa-crown" v-if="club.owner?.id == member.id"></i>
                    {{ member.username }}
                </p>
            </div>
            <p class="text-2xs">{{ getOnlineStatus(member) }}</p>
        </div>
    </RouterLink>
</template>