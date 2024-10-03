<script setup>
import { reactive } from 'vue';

import LabelledToggle from '@/components/ui/toggle/LabelledToggle.vue';
import LoadingImage from '@/components/LoadingImage.vue';
import RoundedButton from '@/components/RoundedButton.vue';

import Assets from '@/utils/Assets';
import TimeUtils from '@/utils/TimeUtils';

const flags = [{
    'desc': 'Cannot upload maps',
    'value': 1 << 0
}, {
    'desc': 'Chat Mute',
    'value': 1 << 1
}, {
    'desc': 'Multiplayer Ban',
    'value': 1 << 2
}, {
    'desc': 'Ranked Ban',
    'value': 1 << 3
}, {
    'desc': 'Score submission ban',
    'value': 1 << 4
}, {
    'desc': 'Cannot change avatar and banner',
    'value': 1 << 5
}, {
    'desc': 'Cannot change profile',
    'value': 1 << 6
}];

const props = defineProps({
    user: Object
});

const react = reactive({
    open: false,
    flags: 0
});

function Toggle() {
    react.flags = props.user.flags
    react.open = !react.open
}

function Save() {
    
}

function ToggleFlag(state, value) {
    if (state)
        react.flags |= value;
    else
        react.flags &= ~value;
}
</script>

<template>
    <div class="w-full flex flex-col bg-dark-2 odd:bg-dark-3">
        <div class="w-full h-12 flex flex-row items-center px-2 gap-3 text-sm select-none" @click="Toggle">
            <div class="size-9">
                <LoadingImage class="size-full object-cover rounded-md" :src="Assets.Avatar(user)" />
            </div>
            <p class="flex-1">{{ user.username }}</p>
            <p class="w-48 line-clamp-1">{{ (user.club || {}).name || "-" }}</p>
            <p class="w-28">{{ TimeUtils.formatDate(user.lastlogin) }}</p>
            <p class="w-28">{{ TimeUtils.formatDate(user.created) }}</p>
        </div>
        <div class="w-full flex flex-col gap-3 p-4 border-t-dark-4 border-t-2" v-if="react.open">
            <div class="flex flex-col gap-1">
                <LabelledToggle :label="flag.desc" :state="react.flags & flag.value"
                    :change="s => ToggleFlag(s, flag.value)" v-for="flag in flags" />
            </div>
            <div class="flex flex-row items-center justify-end gap-2">
                <RouterLink :to="`/u/${user.id}`">
                    <RoundedButton class="text-xs px-3 py-1 bg-dark-4 hover:bg-dark-5">View Profile</RoundedButton>
                </RouterLink>
                <RoundedButton class="text-xs px-3 py-1" @click="alert('wip')" >Save</RoundedButton>
            </div>
        </div>
    </div>
</template>