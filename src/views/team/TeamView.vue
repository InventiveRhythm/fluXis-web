<script setup>
import TeamEntry from './TeamEntry.vue';
import SmallTeamEntry from './SmallTeamEntry.vue';

const staff = [
    {
        "name": "joune",
        "role": 3,
        "id": 29
    },
    {
        "name": "Monoseul",
        "role": 2,
        "id": 90
    }
];

const people = [
    {
        "name": "pepega clap",
        "about": "finding website bugs by intentionally breaking things"
    }
];

setTitle("fluXis Team");
</script>

<template>
    <h1>The fluXis team</h1>
    <p class="sub">The people behind fluXis.</p>
    <div class="list">
        <TeamEntry
            name="Flustix"
            :id=1 role="Lead Development"
            about="Definitely not a Nanahira addict."
            :flip=false />
        <TeamEntry
            name="Akiri"
            :id=2 role="Community Management, Sound Design"
            about="meow"
            :flip=true />
    </div>

    <h1>fluXis Staff</h1>
    <p class="sub">The people who help us keep the community nice and tidy.</p>
    <div class="list small-list">
        <SmallTeamEntry v-for="member in staff" :name="member.name" :id="member.id" :role="member.role"></SmallTeamEntry>
    </div>

    <h1>Special thanks</h1>
    <p class="sub">People who helped us.</p>
    <div class="spacer"></div>
    <p class="small" v-for="person in people">
        {{ person.name }}<span class="grey"> - {{ person.about }}</span>
    </p>
    <div class="spacer"></div>
    <p class="small">All of our contributors.</p>
    <div class="spacer"></div>
    <p class="small">And most importantly,</p>
    <p class="small">you.</p>
</template>

<style>
.list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 900px;
    max-width: 100%;
    margin: 20px 0;
}

.small-list {
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}

.sub {
    font-size: 14px;
}

.spacer {
    height: 15px;
}

.small {
    font-size: 14px;
}

.grey {
    color: var(--text-color-secondary);
}
</style>