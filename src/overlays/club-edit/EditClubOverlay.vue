<script setup>
import { reactive, ref } from 'vue';

import { registerEvent } from '@/utils/Events';
import RoundedButton from '@/components/RoundedButton.vue';
import IconTextBox from '@/components/IconTextBox.vue';

import DefaultClubIcon from '@/assets/images/defaults/club-icon.png';
import DefaultClubBanner from '@/assets/images/defaults/club-banner.png';

import API from '@/utils/API';
import Assets from '@/utils/Assets';
import { state } from '@/utils/State';

const react = reactive({
    club: null,
    icon: "",
    banner: "",
    colorStart: "#ffffff",
    colorEnd: "#ffffff",
    error: ""
})

const allowedImages = ["image/png", "image/jpeg"];

const content = ref();
const icon = ref();
const banner = ref();
let name = "";

registerEvent('club-edit-overlay', club => {
    name = club.name;
    react.colorStart = club.colors[0].color;
    react.colorEnd = club.colors[1].color;
    react.icon = Assets.ClubIcon(club.id);
    react.banner = Assets.ClubBanner(club.id);
    react.club = club;
});

function Perform() {
    API.patch(`/club/${react.club.id}`, {
        'name': name,
        'icon': getAsset(react.icon),
        'banner': getAsset(react.banner),
        'color-start': react.colorStart,
        'color-end': react.colorEnd
    }).then(async res => {
        if (res.status != 200) {
            react.error = res.message;
            return;
        }

        await API.RefreshInfo(state.user.id);
        location.reload();
    })
}

function UpdateIcon() {
    updateAsset(icon.value, b64 => react.icon = b64);
}

function UpdateBanner() {
    updateAsset(banner.value, b64 => react.banner = b64);
}

function UpdateColor(e, end) {
    const hex = e.target.value;

    if (end)
        react.colorEnd = hex;
    else
        react.colorStart = hex;
}

function getAsset(b64) {
    if (!b64)
        return "";

    return b64.split(",")[1];
}

function updateAsset(input, callback) {
    const file = input.files[0];

    if (!file)
        return;

    if (!allowedImages.includes(file.type)) {
        alert("Invalid image type! Only png/jpg/jpeg is supported.");
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        var res = reader.result;
        callback(res);
    };
}

function VoidClick(e) {
    if (e && content.value.contains(e.target))
        return;

    react.club = null;
    react.banner = "";
    react.icon = "";
    react.error = "";
    react.colorStart = "#ffffff";
    react.colorEnd = "#ffffff";
}
</script>

<template>
    <Transition name="club-overlay">
        <div class="pointer-events-auto select-none fixed top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50"
            v-if="react.club" @click="VoidClick">
            <div class="content flex flex-col w-panel gap-4 p-6 bg-dark-3 rounded-2xl drop-shadow-lg" ref="content">
                <div>
                    <p class="text-2xl">Edit Club</p>
                    <p class="text-red" v-if="react.error">{{ react.error }}</p>
                </div>
                <IconTextBox icon="font" :changed="i => name = i" placeholder="Name" maxlength="16" :value="react.club.name" />
                <div class="flex flex-row gap-4">
                    <label for="icon">
                        <img class="rounded-xl size-32 object-cover" :src="react.icon || DefaultClubIcon">
                    </label>
                    <input ref="icon" class="hidden" type="file" id="icon" :accept="allowedImages" @change="UpdateIcon">
                    <label for="banner" class="flex-grow">
                        <img class="w-full rounded-xl h-32 object-cover" :src="react.banner || DefaultClubBanner">
                    </label>
                    <input ref="banner" class="hidden" type="file" id="banner" :accept="allowedImages"
                        @change="UpdateBanner">
                </div>
                <div class="flex gap-2">
                    <input :value="react.colorStart" class="border-none size-12 rounded-xl" type="color"
                        @input="UpdateColor($event, false)">
                    <div class="flex-grow h-12 rounded-xl"
                        :style="`background: linear-gradient(90deg, ${react.colorStart}, ${react.colorEnd})`"></div>
                    <input :value="react.colorEnd" class="border-none size-12 rounded-xl" type="color"
                        @input="UpdateColor($event, true)">
                </div>
                <div class="w-full flex justify-center">
                    <RoundedButton class="w-fit flex flex-row items-center justify-center px-6 py-3" @click="Perform">
                        <p>Create!</p>
                    </RoundedButton>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style>
.club-overlay-enter-active,
.club-overlay-leave-active {
    transition: opacity 150ms, transform 300ms;

    .content {
        transition: all 300ms cubic-bezier(0.22, 1, 0.36, 1);
    }
}

.club-overlay-leave-to,
.club-overlay-enter-from {
    opacity: 0;

    .content {
        scale: .9;
    }
}
</style>