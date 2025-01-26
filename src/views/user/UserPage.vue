<script async setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { reactive } from 'vue';

import APIUser from '@/api/models/users/APIUser';
import { APIError } from '@/api/models/APIError';

import RoundedButton from '@/components/RoundedButton.vue';
import TabControl from '../../components/tabs/TabControl.vue';
import TabControlItem from '../../components/tabs/TabControlItem.vue';
import ErrorContainer from '@/components/status/ErrorContainer.vue';

import API from '@/utils/API';
import { EmitEvent } from '@/utils/Events';
import { state } from '@/utils/State';
import { StartLoading, StopLoading } from '@/utils/Loading';
import Utils from '@/utils/Utils';

import UserHeader from './components/UserHeader.vue';
import UserStats from './components/UserStats.vue';
import UserClub from './components/UserClub.vue';
import UserClubInvite from './components/UserClubInvite.vue';
import UserSidebarSection from './components/sidebar/UserSidebarSection.vue';

const modes = [4, 5, 6, 7, 8];

const route = useRoute();
let id = route.params.id;

let react = reactive<{
    loading: boolean
    error?: string
    user?: APIUser
    mode: number
}>({
    loading: true,
    mode: 0
});

await load();

async function load() {
    StartLoading();

    await API.PerformGet<APIUser>(`/user/${id}?mode=${react.mode}`).then(res => {
        if (!res.IsSuccess())
            throw new APIError(res);

        react.user = res.data!;

        if (react.user && react.user.username)
            Utils.SetTitle(react.user.username + ' - user info');
    }).catch(e => react.error = e.message).finally(() => react.loading = false);

    StopLoading();
}

function OpenEdit() {
    EmitEvent('user-edit-overlay', react.user);
}

function ShouldShowEdit() {
    if (!state.user || state.user?.id == react.user?.id)
        return false;

    return Utils.IsModerator(state.user);
}

function ChangeMode(mode: number) {
    if (react.mode == mode)
        react.mode = 0;
    else
        react.mode = mode;

    load();
}

function AnySocials() {
    return react.user?.socials?.twitter
        || react.user?.socials?.twitch
        || react.user?.socials?.youtube
        || react.user?.socials?.discord
}
</script>

<template>
    <div class="w-full flex flex-col items-center xl:gap-5" v-if="!react.loading && react.user">
        <UserHeader :user="react.user" />
        <UserStats class="mb-3 xl:mb-0" :statistics="react.user.stats" />
        <div class="w-full flex flex-col lg:flex-row justify-center items-start p-3 gap-5">
            <div class="w-full lg:w-80 flex flex-col justify-center gap-5">
                <RoundedButton v-if="ShouldShowEdit()" @click="OpenEdit"
                    class="px-6 py-2 text-dark-text text-opacity-75 text-center bg-dark-2 hover:bg-dark-3">
                    <i class="fa fa-pencil mr-1"></i>
                    Edit
                </RoundedButton>

                <UserClub :club="react.user.club" v-if="react.user.club" />
                <UserClubInvite v-else-if="state.user?.club?.owner?.id == state.user?.id" />

                <UserSidebarSection title="About Me" class="!gap-0" v-if="react.user.aboutme">
                    <p class="text-left opacity-80">{{ react.user.aboutme }}</p>
                </UserSidebarSection>

                <UserSidebarSection title="Socials" v-if="AnySocials()" class="text-left">
                    <div class="flex flex-row gap-2">
                        <a class="hover:text-primary" v-if="react.user.socials?.twitter"
                            :href="`https://twitter.com/${react.user.socials.twitter}`" target="_blank">
                            <i class="fab w-5 text-center text-base fa-twitter"></i>
                        </a>
                        <a class="hover:text-primary" v-if="react.user.socials?.twitch"
                            :href="`https://twitch.tv/${react.user.socials.twitch}`" target="_blank">
                            <i class="fab w-5 text-center text-base fa-twitch"></i>
                        </a>
                        <a class="hover:text-primary" v-if="react.user.socials?.youtube"
                            :href="`https://youtube.com/@${react.user.socials.youtube}`" target="_blank">
                            <i class="fab w-5 text-center text-base fa-youtube"></i>
                        </a>
                        <a v-if="react.user.socials?.discord">
                            <i class="fab w-5 text-center text-base fa-discord"></i>
                        </a>
                    </div>
                </UserSidebarSection>

                <UserSidebarSection class="hidden lg:flex" title="Followers">
                    <div class="no-followers">
                        <i class="fas fa-user-friends"></i>
                        <p>No followers</p>
                    </div>
                </UserSidebarSection>
            </div>
            <div class="w-full lg:w-auto flex-1 flex flex-col gap-4 text-left mt-5 md:mt-0">
                <div class="flex flex-col-reverse md:flex-row justify-between items-center gap-4">
                    <TabControl>
                        <TabControlItem :url="`/u/${id}/scores`" :alternate="`/u/${id}`"
                            icon="fa-solid fa-arrow-trend-up" text="Scores" />
                        <TabControlItem :url="`/u/${id}/maps`" icon="fa-solid fa-map" text="Maps" />
                    </TabControl>
                    <div class="flex flex-row gap-2">
                        <div class="w-16 h-8 md:w-12 md:h-6 flex flex-col items-center justify-center text-sm text-black text-opacity-75 rounded-full transition-colors leading-none"
                            :class="[{ 'bg-opacity-0 text-white hover:bg-opacity-60': react.mode != 0 && react.mode != mode }, `bg-mode-${mode}`]"
                            @click="ChangeMode(mode)" @keydown.enter="ChangeMode(mode)" role="button" tabindex="0"
                            v-for="mode in modes">
                            {{ mode }}K
                        </div>
                    </div>
                </div>
                <RouterView v-slot="{ Component }">
                    <component :is="Component" :user="react.user" :mode="react.mode" />
                </RouterView>
            </div>
        </div>
    </div>
    <ErrorContainer :text="react.error" v-if="!react.loading && !react.user" />
</template>