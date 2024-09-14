<script setup>
import { RouterLink } from 'vue-router';

import RoundedButton from '../../../components/RoundedButton.vue';
import LoadingImage from '@/components/LoadingImage.vue';

import Assets from '@/utils/Assets';
import TimeUtils from '@/utils/TimeUtils';
import API from '@/utils/API';
import Config from '@/config.json';
import { state } from '@/utils/State';

const props = defineProps({
    club: Object
});

function getOnlineStatus(member) {
    if (member.online)
        return "online";

    if (!member.lastlogin)
        return "";

    return `last online ${TimeUtils.formatAgo(member.lastlogin)}`;
}

async function invite() {
    const id = prompt("Enter the ID of the user you want to invite:");

    const parsed = parseInt(id);

    if (!parsed) {
        alert(`'${id}' is not a valid user id.`)
        return;
    }

    API.post(`/club/${props.club.id}/invites`, {
        user: parsed
    }).then(res => {
        if (res.status != 201) {
            alert(res.message);
            return;
        }

        alert(`Invite created! Give the person you want to invite this link: ${Config.baseUrl}/invite/${res.data.code}`)
    })
}
</script>

<template>
    <div class="flex flex-col items-center gap-3">
        <RouterLink :to="`/u/${member.id}`" class="w-full flex flex-row items-center gap-2" v-for="member in club.members">
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
        <RoundedButton v-if="state.user && state.user.id == club.owner.id" @click="invite" class="px-6 py-2 text-white text-opacity-75 mt-3">Invite...</RoundedButton>
    </div>
</template>