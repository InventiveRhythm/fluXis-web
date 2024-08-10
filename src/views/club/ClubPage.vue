<script async setup>
import { reactive } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import TabControl from '../../components/tabs/TabControl.vue';
import TabControlItem from '../../components/tabs/TabControlItem.vue';
import ClubHeader from './components/ClubHeader.vue';
import RoundedButton from '@/components/RoundedButton.vue';

import API from '@/utils/API';
import Utils from '@/utils/Utils';
import { startLoading, stopLoading } from '@/utils/Loading';
import { state } from '@/utils/State';
import { emitEvent } from '@/utils/Events';

const route = useRoute();
const id = parseInt(route.params.id);

const react = reactive({
    loading: true,
    club: null
});

startLoading();

try {
    await API.get(`/club/${id}`).then(res => {
        if (res.status != 200) return;

        react.club = res.data;
        Utils.setTitle(react.club.name + " - club info");
    })
} catch (err) {
    console.error(err);
}

react.loading = false;
stopLoading();

function OpenEdit() {
    emitEvent('club-edit-overlay', react.club);
}

function CanEdit() {
    if (!state.user)
        return false;

    if (react.club.owner.id == state.user.id)
        return true;

    if (state.user.groups.some(g => g.id == "dev"))
        return true;
    
    return false;
}
</script>

<template>
    <div class="flex flex-col" v-if="!react.loading && react.club">
        <ClubHeader :club="react.club" />
        <div class="w-full flex justify-center items-start pt-8 px-4 gap-8">
            <div class="w-full flex flex-col gap-4 text-left">
                <TabControl>
                    <TabControlItem :url="`/club/${id}/members`" :alternate="`/club/${id}`"
                        icon="fa-solid fa-user-group" text="Members" />
                    <TabControlItem :url="`/club/${id}/scores`" icon="fa-solid fa-arrow-trend-up" text="Scores" />
                </TabControl>
                <RouterView v-slot="{ Component }">
                    <component :is="Component" :club="react.club" />
                </RouterView>
            </div>
            <div class="w-80 min-w-80 flex flex-col gap-7 text-left">
                <RoundedButton v-if="CanEdit()" @click="OpenEdit"
                    class="px-6 py-2 text-white text-opacity-75 mt-3 text-center bg-dark-2 hover:bg-dark-3">
                    <i class="fa fa-pencil mr-1"></i>
                    Edit
                </RoundedButton>
                <div class="flex flex-col gap-2">
                    <p class="text-2xl">Statistics</p>
                    <div class="flex flex-col gap-1 text-sm">
                        <div class="flex flex-row items-center justify-between">
                            <p class="opacity-80">Overall Rating</p>
                            <p>{{ react.club.stats.ovr }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>