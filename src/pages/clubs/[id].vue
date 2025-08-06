<script setup lang="ts">
import type { ClubOverlayEdit } from '#components';
import type APIClub from '~/models/clubs/APIClub';
import API from '~/utils/api';
import Format from '~/utils/formatting';

const editPanel = ref<InstanceType<typeof ClubOverlayEdit>>();

const { data: club, error } = await API.PerformGet<APIClub>(`/club/${useRoute().params.id}`);

if (club) {
    useSeoMeta({
        title: `${club.name} - club info`,
        ogTitle: `${club.name} - club info`
    });
}

function CanEdit() {
    const user = API.CurrentUser.value;

    if (!user || !club || !club.owner) return false;
    if (club.owner.id == user.id) return true;

    return user.groups.some((x) => x.id == 'dev') ?? false;
}

function CanLeave() {
    const user = API.CurrentUser.value;

    if (!user || !club || !club.owner || !club.members) return false;
    if (club.owner.id == user.id) return false;

    return club.members?.some((m) => m.id == user?.id) ?? false;
}
</script>

<template>
    <div class="flex flex-col" v-if="club">
        <ClubHeader :club="club" />
        <div class="flex w-full flex-col-reverse items-start justify-center gap-4 px-4 pt-4 lg:flex-row lg:gap-8 xl:pt-8">
            <div class="flex w-full flex-1 flex-col gap-4 text-left lg:w-auto">
                <TabControl>
                    <TabControlItem
                        :url="`/clubs/${club.id}/members`"
                        :alternate="`/clubs/${club.id}`"
                        icon="fa-solid fa-user-group"
                        :text="Localize('club.members')"
                    />
                    <TabControlItem :url="`/clubs/${club.id}/scores`" icon="fa-solid fa-arrow-trend-up" :text="Localize('club.scores')" />
                    <TabControlItem :url="`/clubs/${club.id}/claims`" icon="fa-solid fa-star" :text="Localize('club.claims')" />
                </TabControl>
                <div class="grid w-full *:col-1 *:row-1">
                    <NuxtPage :club="club" />
                </div>
            </div>
            <div class="flex w-full min-w-80 flex-col gap-6 text-left lg:w-80">
                <div class="flex w-full flex-col gap-4" v-if="CanEdit() || CanLeave()">
                    <Button
                        v-if="CanEdit()"
                        @click="editPanel?.Open(club)"
                        class="bg-dark-2 px-6 py-2 text-center text-dark-text text-opacity-75 hover:bg-dark-3"
                    >
                        <i class="fa fa-pencil mr-1"></i>
                        {{ Localize('generic.edit') }}
                    </Button>
                    <Button v-if="CanLeave()" class="bg-dark-2 px-6 py-2 text-center text-dark-text text-opacity-75 hover:bg-red hover:text-dark-2">
                        <i class="fa fa-door-open mr-1"></i>
                        {{ Localize('club.leave') }}
                    </Button>
                </div>
                <div class="flex flex-col gap-2">
                    <p class="text-2xl">{{ Localize('stats.title') }}</p>
                    <div class="flex flex-col gap-1 text-sm">
                        <div class="flex flex-row items-center justify-between">
                            <p class="opacity-80">{{ Localize('stats.rank') }}</p>
                            <p>#{{ club.stats?.rank }}</p>
                        </div>
                        <div class="flex flex-row items-center justify-between">
                            <p class="opacity-80">{{ Localize('stats.overall') }}</p>
                            <p>{{ club.stats?.ovr }}</p>
                        </div>
                        <div class="flex flex-row items-center justify-between">
                            <p class="opacity-80">{{ Localize('stats.score') }}</p>
                            <p>{{ Format.Score(club.stats?.score) }}</p>
                        </div>
                        <div class="flex flex-row items-center justify-between">
                            <p class="opacity-80">{{ Localize('stats.claims.count') }}</p>
                            <p>{{ club.stats?.claims }}</p>
                        </div>
                        <div class="flex flex-row items-center justify-between">
                            <p class="opacity-80">{{ Localize('stats.claims.percent') }}</p>
                            <p>{{ Format.Accuracy(club.stats['claim-percent']) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ClubOverlayEdit ref="editPanel" />
    </div>
    <ErrorContainer :text="error?._request" v-else-if="error" />
</template>
