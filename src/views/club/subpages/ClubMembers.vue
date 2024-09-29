<script setup>
import RoundedButton from '../../../components/RoundedButton.vue';
import ClubMember from './members/ClubMember.vue';

import API from '@/utils/API';
import Config from '@/config.json';
import { state } from '@/utils/State';

const props = defineProps({
    club: Object
});

async function invite() {
    const id = prompt("Enter the ID of the user you want to invite:");

    const parsed = parseInt(id);

    if (!parsed) {
        alert(`'${id}' is not a valid user id.`)
        return;
    }

    API.PerformPost(`/club/${props.club.id}/invites`, {
        user: parsed
    }).then(res => {
        if (res.status != 201) {
            alert(res.message);
            return;
        }

        alert(`Invite created! Give the person you want to invite this link: ${Config.BaseUrl}/invite/${res.data.code}`)
    })
}
</script>

<template>
    <div class="flex flex-col items-center gap-3">
        <ClubMember :club="club" :member="member" v-for="member in club.members" />
        <RoundedButton v-if="state.user && state.user.id == club.owner.id" @click="invite" class="px-6 py-2 text-white text-opacity-75 mt-3">Invite...</RoundedButton>
    </div>
</template>