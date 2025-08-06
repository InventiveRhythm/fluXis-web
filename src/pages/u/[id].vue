<script setup lang="ts">
import { UserSidebarClub } from '#components';
import type APIUser from '~/models/users/APIUser';
import API from '~/utils/api';
import Assets from '~/utils/assets';

const route = useRoute();
const id = route.params.id;

const { data: user, error } = await API.PerformGet<APIUser>(`/user/${id}`);
let any_socials: boolean | undefined = false;

if (user) {
    utils.SetMetadata(`${user.username} - profile`, `global: #${user.stats.global} - country: #${user.stats.country}`, Assets.Avatar(user));
    if (user.socials && (user.socials.discord || user.socials.twitch || user.socials.twitter || user.socials.youtube)) any_socials = true;
}
</script>

<template>
    <div class="flex w-full flex-col items-center xl:gap-5" v-if="user">
        <div class="flex w-full flex-col rounded-3xl bg-dark-2">
            <UserHeader :user="user" />
            <UserStats :user="user" />
        </div>
        <div class="flex w-full flex-col items-start justify-center gap-1 p-3 md:gap-5 lg:flex-row">
            <div class="flex w-full flex-col justify-center gap-5 lg:w-80">
                <UserSidebarClub :club="user.club" v-if="user.club" />
                <UserSidebarSection title="About Me" class="hidden !gap-0 md:flex" v-if="user.aboutme">
                    <p class="text-left opacity-80">{{ user.aboutme }}</p>
                </UserSidebarSection>
                <UserSidebarSection title="Socials" class="hidden text-left md:flex" v-if="user.socials && any_socials">
                    <UserSocialEntry icon="fa-twitter" :link="`https://twitter.com/${user.socials.twitter}`" :text="user.socials.twitter" />
                    <UserSocialEntry icon="fa-twitch" :link="`https://twitch.tv/${user.socials.twitch}`" :text="user.socials.twitch" />
                    <UserSocialEntry icon="fa-youtube" :link="`https://youtube.com/@${user.socials.youtube}`" :text="user.socials.youtube" />
                    <UserSocialEntry icon="fa-discord" :text="user.socials.discord" />
                </UserSidebarSection>
                <UserSidebarFollowers class="hidden md:flex" :user="user" />
            </div>
            <div class="flex w-full flex-1 flex-col gap-4 text-left lg:w-auto">
                <div class="flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
                    <TabControl>
                        <TabControlItem :url="`/u/${user.id}/scores`" :alternate="`/u/${user.id}`" text="Scores" icon="fa-solid fa-arrow-trend-up" />
                        <TabControlItem :url="`/u/${user.id}/maps`" text="Maps" icon="fa-solid fa-map" />
                    </TabControl>
                    <div class="flex flex-row gap-2"></div>
                </div>
                <div class="grid w-full *:col-1 *:row-1">
                    <NuxtPage :user="user" />
                </div>
            </div>
        </div>
    </div>
    <ErrorContainer :text="error._request" v-else-if="error" />
</template>
