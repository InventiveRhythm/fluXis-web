<script setup lang="ts">
import type APIUser from '~/models/users/APIUser';
import API from '~/utils/api';
import Assets from '~/utils/assets';

const { data: team } = await API.PerformGet<{
    devs: APIUser[];
    staff: APIUser[];
}>('/team');

function IsFlipped(user: APIUser) {
    return team!.devs.indexOf(user) % 2 != 0;
}
</script>

<template>
    <div class="w-fit-mobile flex" v-if="team">
        <div class="mx-auto w-full max-w-[900px]">
            <p class="text-2xl">InventiveRhythm</p>
            <p class="mb-5 text-sm">The people behind the game.</p>
            <div class="mb-8 flex flex-col gap-4">
                <NuxtLink :to="`/u/${dev.id}`" class="overlap-grid h-40 w-full items-center rounded-lg md:h-36" v-for="dev in team.devs">
                    <LoadingImage class="object-cover" :src="Assets.Banner(dev)" />
                    <div class="section-gradient opacity-60" :class="{ 'rotate-180': IsFlipped(dev) }"></div>
                    <div
                        class="flex flex-col items-center justify-center gap-2 p-6 md:flex-row md:justify-start md:gap-4"
                        :class="{ 'md:flex-row-reverse': IsFlipped(dev) }"
                    >
                        <LoadingImage class="size-16 rounded-lg object-cover md:size-24" :src="Assets.Avatar(dev)" />
                        <div class="text-center md:text-left" :class="{ 'md:text-right': IsFlipped(dev) }">
                            <p class="text-xl leading-tight">{{ dev.username }}</p>
                            <p class="mb-1 text-xs leading-tight opacity-80">{{ dev.groups[0].name }}</p>
                            <p class="hidden text-sm md:block">{{ dev.aboutme }}</p>
                        </div>
                    </div>
                </NuxtLink>
            </div>

            <template v-if="team.staff.length > 0">
                <p class="text-2xl">fluXis Staff</p>
                <p class="mb-5 text-sm">The people who keep the community nice and tidy.</p>
                <div class="mb-8 grid w-full grid-cols-1 gap-2 md:grid-cols-2">
                    <NuxtLink :to="`/u/${member.id}`" class="overlap-grid h-12 w-full rounded-md" v-for="member in team.staff">
                        <LoadingImage class="object-cover" :src="Assets.Banner(member)" />
                        <div class="section-gradient opacity-60"></div>
                        <div class="flex flex-row items-center gap-2">
                            <LoadingImage class="size-12 rounded-md object-cover" :src="Assets.Avatar(member)" />
                            <div class="text-left leading-none">
                                <p>{{ member.username }}</p>
                                <p class="text-xs" :style="{ color: member.groups[0].color }">{{ member.groups[0].name }}</p>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </template>

            <p class="text-2xl">Special thanks</p>
            <p class="mb-8 text-sm">All of our contributors.</p>

            <p class="text-sm">And most importantly,</p>
            <p class="mb-8 text-sm underline">you.</p>
        </div>
    </div>
</template>
