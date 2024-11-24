<script async setup lang="ts">
import { reactive } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import APIClub from '@/api/models/clubs/APIClub';

import TabControl from '@/components/tabs/TabControl.vue';
import TabControlItem from '@/components/tabs/TabControlItem.vue';
import ClubHeader from './components/ClubHeader.vue';
import RoundedButton from '@/components/RoundedButton.vue';

import EditClubOverlay from './overlays/EditClubOverlay.vue';
import ClubLeaveOverlay from './overlays/ClubLeaveOverlay.vue';
import ClubKickOverlay from './overlays/ClubKickOverlay.vue';

import ErrorContainer from '@/components/status/ErrorContainer.vue';

import API from '@/utils/API';
import Utils from '@/utils/Utils';
import { FormatAccuracy, FormatScore } from '@/utils/Formatting';
import { StartLoading, StopLoading } from '@/utils/Loading';
import { state } from '@/utils/State';
import { EmitEvent } from '@/utils/Events';

const route = useRoute();
const id = route.params.id;

const react = reactive({
    loading: true,
    error: '',
    club: APIClub.CreateDummy()
});

StartLoading();

try {
    await API.PerformGet<APIClub>(`/club/${id}`).then(res => {
        if (!res.IsSuccess() || !res.data) {
            react.error = res.message;
            return;
        }

        react.club = res.data;
        Utils.SetTitle(res.data.name + ' - club info');
    });
} catch (err: any) {
    react.error = err;
    console.error(err);
}

react.loading = false;
StopLoading();

function OpenEdit() {
    EmitEvent('club-edit-overlay', react.club);
}

function OpenLeave() {
    EmitEvent('club-leave-overlay', react.club);
}

function CanEdit() {
    if (!state.user || !react.club || !react.club.owner)
        return false;

    if (react.club.owner?.id == state.user?.id)
        return true;

    return state.user?.groups.some(g => g.id == 'dev') ?? false;
}

function CanLeave() {
    if (!state.user || !react.club || !react.club.owner || !react.club.members)
        return false;

    if (react.club.owner?.id == state.user?.id)
        return false;

    return react.club.members?.some(m => m.id == state.user?.id) ?? false;
}
</script>

<template>
    <div class="flex flex-col" v-if="!react.loading && react.club">
        <ClubHeader :club="react.club" />
        <div class="w-full flex justify-center items-start pt-8 px-4 gap-8">
            <div class="flex-1 flex flex-col gap-4 text-left">
                <TabControl>
                    <TabControlItem :url="`/club/${id}/members`" :alternate="`/club/${id}`"
                                    icon="fa-solid fa-user-group" text="Members" />
                    <TabControlItem :url="`/club/${id}/scores`" icon="fa-solid fa-arrow-trend-up" text="Scores" />
                    <TabControlItem :url="`/club/${id}/claims`" icon="fa-solid fa-star" text="Claims" />
                </TabControl>
                <RouterView v-slot="{ Component }">
                    <component :is="Component" :club="react.club" />
                </RouterView>
            </div>
            <div class="w-80 min-w-80 flex flex-col gap-7 text-left">
                <div class="w-full flex flex-col gap-4">
                    <RoundedButton v-if="CanEdit()" @click="OpenEdit"
                                   class="bg-dark-2 px-6 py-2 text-center text-dark-text text-opacity-75 hover:bg-dark-3">
                        <i class="fa fa-pencil mr-1"></i>
                        Edit
                    </RoundedButton>
                    <RoundedButton v-if="CanLeave()" @click="OpenLeave"
                                   class="px-6 py-2 text-center text-dark-text text-opacity-75 bg-dark-2 hover:text-dark-2 hover:bg-red">
                        <i class="fa fa-door-open mr-1"></i>
                        Leave
                    </RoundedButton>
                </div>
                <div class="flex flex-col gap-2">
                    <p class="text-2xl">Statistics</p>
                    <div class="flex flex-col gap-1 text-sm">
                        <div class="flex flex-row items-center justify-between">
                            <p class="opacity-80">Rank</p>
                            <p>#{{ react.club.stats?.rank }}</p>
                        </div>
                        <div class="flex flex-row items-center justify-between">
                            <p class="opacity-80">Overall Rating</p>
                            <p>{{ react.club.stats?.ovr }}</p>
                        </div>
                        <div class="flex flex-row items-center justify-between">
                            <p class="opacity-80">Total Score</p>
                            <p>{{ FormatScore(react.club.stats?.score) }}</p>
                        </div>
                        <div class="flex flex-row items-center justify-between">
                            <p class="opacity-80">Claimed Maps</p>
                            <p>{{ react.club.stats?.claims }}</p>
                        </div>
                        <div class="flex flex-row items-center justify-between">
                            <p class="opacity-80">Claimed%</p>
                            <p>{{ FormatAccuracy(react.club.stats['claim-percent']) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ErrorContainer :text="react.error" v-if="!react.loading && !react.club" />
    <ClubLeaveOverlay />
    <EditClubOverlay />
    <ClubKickOverlay />
</template>