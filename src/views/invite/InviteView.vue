<script setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ClubTag from '../../components/ClubTag.vue';
import RoundedButton from '../../components/RoundedButton.vue';

import API from '../../utils/API';
import Assets from '../../utils/Assets';
import { state } from '@/utils/State';
import { startLoading, stopLoading } from '../../utils/Loading';

const route = useRoute();
const router = useRouter();
const code = route.params.code;

const react = reactive({
    loading: true,
    error: "",
    invite: null
});

if (!state.user) {
    react.error = "Please log in to accept invites.";
} else {
    startLoading();

    try {
        API.get(`/invites/${code}`).then(res => {
            stopLoading();
            react.loading = false;

            if (res.status != 200) {
                react.error = res.message;
                console.log(react.error);
                return;
            }

            if (state.user.id != res.data.user) {
                react.error = "This invite is not intended for you!";
                return;
            }

            react.invite = res.data;
        })
    } catch (ex) {
        react.loading = false;
        stopLoading();
        console.log(ex)
    }
}

function acceptInvite() {
    startLoading();

    API.post(`/invites/${code}`, {}).then(res => {
        stopLoading();

        if (res.status != 200) {
            react.error = res.message;
            return;
        }

        router.push(`/club/${react.invite.club.id}`)
        stopLoading();
    })
}
</script>

<template>
    <div v-if="react.error">
        {{ react.error }}
    </div>
    <div class="flex flex-col justify-center items-center pt-24" v-else-if="!react.loading && react.invite">
        <img class="size-56 object-cover mb-8 rounded-2xl" :src="Assets.ClubIcon(react.invite.club.id)" alt="">
        <p class="text-sm opacity-80">You've been invited to join</p>
        <div class="flex items-center gap-2">
            <ClubTag class="text-xl" :club="react.invite.club"></ClubTag>
            <p class="text-2xl">{{ react.invite.club.name }}</p>
        </div>
        <RoundedButton @click="acceptInvite" class="px-6 py-2 text-white text-opacity-75 mt-6">Accept Invite
        </RoundedButton>
    </div>

    <img class="absolute top-0 left-0 blur-md w-screen h-screen object-cover -z-10 opacity-20"
        :src="Assets.ClubBanner(react.invite.club.id)" v-if="!react.loading && react.invite" />
</template>