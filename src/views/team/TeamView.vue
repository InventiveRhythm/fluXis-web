<script setup>
import TeamEntry from './TeamEntry.vue';
import SmallTeamEntry from './SmallTeamEntry.vue';
import Utils from '@/utils/Utils';

const staff = [
    {
        "name": "joune",
        "role": 3,
        "id": 29
    },
    {
        "name": "Monoseul",
        "role": 3,
        "id": 90
    }
];

const people = [
    {
        "name": "pepega clap",
        "about": "finding website bugs by intentionally breaking things"
    }
];

Utils.SetTitle("the team");
</script>

<template>
    <div class="flex justify-center">
        <div class="w-[900px]">
            <p class="text-2xl">The fluXis team</p>
            <p class="text-sm mb-5">The people behind fluXis.</p>
            <div class="flex flex-col gap-4 mb-8">
                <TeamEntry name="Flustix" :id=1 role="Lead Development, UI Design" about="nanahira and choccy milk addict" />
                <TeamEntry name="Akiri" :id=2 role="Community Management, Sound Design" about="I make stuff" flip />
            </div>

            <p class="text-2xl">fluXis Staff</p>
            <p class="text-sm mb-5">The people who keep the community nice and tidy.</p>
            <div class="w-full grid gap-2 grid-cols-2 mb-5">
                <SmallTeamEntry v-for="member in staff" :name="member.name" :id="member.id" :role="member.role" />
            </div>

            <p class="text-2xl">Special thanks</p>
            <p class="text-sm mb-5">People who helped us.</p>
            <p class="text-sm mb-4" v-for="person in people">
                {{ person.name }}
                <span class="opacity-80"> - {{ person.about }}</span>
            </p>

            <p class="text-sm mb-8">All of our contributors.</p>

            <p class="text-sm">And most importantly,</p>
            <p class="text-sm underline mb-8">you.</p>
        </div>
    </div>
</template>