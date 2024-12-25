<script setup lang="ts">
import type APIClub from '@/api/models/clubs/APIClub';

import ClubBanner from '@/components/images/ClubBanner.vue';
import ClubIcon from '@/components/images/ClubIcon.vue';
import ClubTag from '@/components/ClubTag.vue';

import { Localize } from '@/utils/Localization';

defineProps<{
    club: APIClub
}>();
</script>

<template>
    <div class="overlap-grid w-full h-44 rounded-2xl">
        <ClubBanner class="object-cover" :club="club" />
        <div class="bg-dark-2 opacity-50"></div>
        <div class="flex flex-col items-center justify-center">
            <div class="w-full max-w-[960px] px-10 flex flex-row items-center justify-start gap-5">
                <div class="size-32">
                    <ClubIcon class="size-full rounded-xl shadow-normal" :club="club" />
                </div>
                <div class="flex-1 flex flex-col text-left">
                    <div class="w-full flex gap-1.5 items-center">
                        <ClubTag class="text-xl" :club="club" />
                        <p class="text-3xl line-clamp-1">{{ club.name }}</p>
                    </div>
                    <p class="opacity-80" v-if="club.members">
                        {{ Localize(club.members.length > 1 ? "club.members.count" : "club.members.count.singular", club.members.length) }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>