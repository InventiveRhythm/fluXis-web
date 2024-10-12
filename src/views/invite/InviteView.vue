<script setup lang="ts">
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import APIInvite from '@/api/models/invite/APIInvite';

import ClubTag from '../../components/ClubTag.vue';
import RoundedButton from '../../components/RoundedButton.vue';
import LoadingImage from '@/components/LoadingImage.vue';

import API from '../../utils/API';
import Assets from '../../utils/Assets';
import { StartLoading, StopLoading } from '@/utils/Loading';
import { state } from '@/utils/State';
import Utils from '@/utils/Utils';

const route = useRoute();
const router = useRouter();
const code = route.params.code;

const react = reactive({
    loading: true,
    error: '',
    invite: new APIInvite()
});

if (!state.user) {
    react.error = 'Please log in to accept invites.';
} else {
    Utils.SetTitle('loading...');
    StartLoading();

    try {
        API.PerformGet<APIInvite>(`/invites/${code}`).then(res => {
            StopLoading();
            react.loading = false;

            if (!res.IsSuccess()) {
                react.error = res.message;
                console.log(react.error);
                return;
            }

            react.invite = res.data!;

            if (state.user?.id != res.data?.user) {
                react.error = 'This invite is not intended for you!';
                return;
            }

            Utils.SetTitle(`you've been invited to '${res.data?.club.name}'!`);
        });
    } catch (ex) {
        react.loading = false;
        StopLoading();
        console.log(ex);
    }
}

function acceptInvite() {
    StartLoading();

    API.PerformPost(`/invites/${code}`, {}).then(res => {
        StopLoading();

        if (!res.IsSuccess()) {
            react.error = res.message;
            return;
        }

        router.push(`/club/${react.invite.club.id}`);
        StopLoading();
    });
}
</script>

<template>
    <div class="overlap-grid w-full rounded-3xl">
        <LoadingImage class="size-full object-cover scale-110 blur-sm" alt="background"
                      :src="Assets.ClubBanner(react.invite.club)" v-if="!react.loading && react.invite" />
        <div class="bg-dark-2 opacity-75"></div>
        <div class="size-full flex flex-col justify-center items-center py-24">
            <div class="text-lg" v-if="react.error">
                {{ react.error }}
                <!--<p class="text-sm opacity-80">Please ask the club owner for a new invite.</p>-->
            </div>
            <div v-else-if="!react.loading && react.invite">
                <img class="size-56 object-cover mb-8 rounded-2xl" :src="Assets.ClubIcon(react.invite.club)" alt="">
                <p class="text-sm opacity-80">You've been invited to join</p>
                <div class="flex items-center gap-2">
                    <ClubTag class="text-xl" :club="react.invite.club"></ClubTag>
                    <p class="text-2xl">{{ react.invite.club.name }}</p>
                </div>
                <RoundedButton @click="acceptInvite" class="px-6 py-2 text-white text-opacity-75 mt-6">
                    Accept Invite
                </RoundedButton>
            </div>
        </div>
    </div>
</template>