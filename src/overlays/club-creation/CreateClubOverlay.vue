<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import type APIClub from '@/api/models/clubs/APIClub';

import PanelOverlay from '../PanelOverlay.vue';
import RoundedButton from '@/components/RoundedButton.vue';

import DefaultClubIcon from '@/assets/images/defaults/club-icon.png';
import DefaultClubBanner from '@/assets/images/defaults/club-banner.png';

import API from '@/utils/API';
import { RegisterEvent } from '@/utils/Events';
import Utils from '@/utils/Utils';
import { state } from '@/utils/State';

const router = useRouter();

const react = reactive({
    open: false,
    icon: '',
    banner: '',
    colorStart: '#ffffff',
    colorEnd: '#ffffff',
    error: ''
});

const allowedImages = ['image/png', 'image/jpeg'];

const tag = ref();
const name = ref();
const icon = ref();
const banner = ref();

RegisterEvent('club-overlay', (state: boolean) => react.open = state);

function Perform() {
    API.PerformPost<APIClub>('/clubs', {
        'name': name.value.value,
        'tag': tag.value.value,
        'icon': getAsset(react.icon),
        'banner': getAsset(react.banner),
        'join-type': 1,
        'color-start': react.colorStart,
        'color-end': react.colorEnd
    }).then(res => {
        if (!res.IsSuccess() || !res.data) {
            react.error = res.message;
            return;
        }

        API.RefreshInfo(state.user?.id ?? 0);
        router.push(`/club/${res.data.id}`);
        react.open = false;
    });
}

function UpdateIcon() {
    Utils.GetB64FromInput(icon.value, allowedImages, (b64: string) => react.icon = b64);
}

function UpdateBanner() {
    Utils.GetB64FromInput(banner.value, allowedImages, (b64: string) => react.banner = b64);
}

function UpdateColor(e: HTMLInputElement, end: boolean) {
    if (!e)
        return;

    const hex = e.value;

    if (end)
        react.colorEnd = hex;
    else
        react.colorStart = hex;
}

function getAsset(b64: string) {
    if (!b64)
        return '';

    return b64.split(',')[1];
}
</script>

<template>
    <PanelOverlay title="Create Club" :error="react.error" :open="react.open" :voidclick="() => react.open = false">
        <div class="flex text-left gap-4">
            <div class="relative">
                <div class="absolute left-4 top-4 size-6 flex items-center justify-center">
                    <i class="fa fa-tag text-xl"></i>
                </div>
                <input ref="tag" class="w-56 p-4 pl-12 bg-dark-2 uppercase rounded-xl focus:outline-none"
                       placeholder="Tag" type="text" maxlength="5">
            </div>
            <div class="relative">
                <div class="absolute left-4 top-4 size-6 flex items-center justify-center">
                    <i class="fa fa-font text-xl"></i>
                </div>
                <!-- obscure width because css hates me and doesnt want me to juse use flex-grow -->
                <input ref="name" class="w-[332px] p-4 pl-12 bg-dark-2 rounded-xl focus:outline-none" placeholder="Name"
                       type="text" maxlength="16">
            </div>
        </div>
        <div class="flex flex-row gap-4">
            <label for="icon">
                <img class="rounded-xl size-32 object-cover" :src="react.icon || DefaultClubIcon" alt="club icon">
            </label>
            <input ref="icon" class="hidden" type="file" id="icon" :accept="allowedImages" @change="UpdateIcon">
            <label for="banner" class="flex-grow">
                <img class="w-full rounded-xl h-32 object-cover" :src="react.banner || DefaultClubBanner"
                     alt="club banner">
            </label>
            <input ref="banner" class="hidden" type="file" id="banner" :accept="allowedImages" @change="UpdateBanner">
        </div>
        <div class="flex gap-2">
            <input value="#ffffff" class="border-none size-12 rounded-xl" type="color"
                   @input="UpdateColor($event.target, false)">
            <div class="flex-grow h-12 rounded-xl"
                 :style="`background: linear-gradient(90deg, ${react.colorStart}, ${react.colorEnd})`"></div>
            <input value="#ffffff" class="border-none size-12 rounded-xl" type="color"
                   @input="UpdateColor($event.target, true)">
        </div>
        <div class="w-full flex justify-center">
            <RoundedButton class="w-fit flex flex-row items-center justify-center px-6 py-3" @click="Perform">Create!
            </RoundedButton>
        </div>
    </PanelOverlay>
</template>