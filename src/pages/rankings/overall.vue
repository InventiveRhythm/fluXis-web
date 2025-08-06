<script setup lang="ts">
import type APIUser from '~/models/users/APIUser';
import API from '~/utils/api';
import Assets from '~/utils/assets';

const mode = useRoute().query.mode;
const { data: users } = await API.PerformGet<APIUser[]>(`/leaderboards/overall?mode=${mode}`);
</script>

<template>
    <div class="w-fit-mobile">
        <h1 class="text-4xl">Global Rankings</h1>
        <h2 class="mb-6 text-xl opacity-80">Overall Rating</h2>
        <div class="flex flex-col gap-4" v-if="users?.length">
            <NuxtLink :to="`/u/${u.id}`" class="overlap-grid h-20 w-full overflow-hidden rounded-xl" v-for="u in users">
                <LoadingImage class="object-cover" :src="Assets.Banner(u)" />
                <div class="bg-dark-2 opacity-50"></div>
                <div class="flex items-center">
                    <div class="flex size-20 items-center justify-center text-xl">
                        <p>#{{ u.stats?.global }}</p>
                    </div>
                    <LoadingImage class="size-20 rounded-xl object-cover" :src="Assets.Avatar(u)" />
                    <div class="flex flex-grow items-center justify-between px-4">
                        <div class="flex flex-col text-left">
                            <span class="flex items-center gap-2 text-xl">
                                <ClubTag :club="u.club" class="text-lg" />
                                {{ u.displayname || u.username }}
                                <span class="text-base opacity-80" v-if="u.displayname">
                                    {{ u.username }}
                                </span>
                            </span>
                            <span class="flex flex-row items-center gap-1.5" v-if="u.country">
                                <Icon class="rounded-sm" :name="`flag:${u.country}-4x3`" />
                                {{ utils.GetCountryName(u.country) }}
                            </span>
                        </div>
                        <div class="text-right">
                            <span class="text-xl leading-none"> {{ u.stats.ovr }} OVR </span>
                            <div class="text-sm leading-none opacity-80">
                                <span> {{ u.stats.ptr }} PR • {{ formatting.Accuracy(u.stats.ova) }} </span>
                            </div>
                        </div>
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>
