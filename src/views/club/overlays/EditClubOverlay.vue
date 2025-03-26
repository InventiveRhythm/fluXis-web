<script setup lang="ts">
import { reactive, ref } from 'vue';
import ColorPicker from '@/components/color/ColorPicker.vue';
import PanelOverlay from '@/overlays/PanelOverlay.vue';
import RoundedButton from '@/components/RoundedButton.vue';
import IconTextBox from '@/components/IconTextBox.vue';
import DefaultClubIcon from '@/assets/images/defaults/club-icon.png';
import DefaultClubBanner from '@/assets/images/defaults/club-banner.png';
import API from '@/utils/API';
import Assets from '@/utils/Assets';
import { RegisterEvent } from '@/utils/Events';
import { state } from '@/utils/State';
import Utils from '@/utils/Utils';

const react = reactive({
    open: false,
    club: null,
    icon: '',
    banner: '',
    colorStart: '#ffffff',
    colorEnd: '#ffffff',
    error: ''
});

const allowedImages = ['image/png', 'image/jpeg'];

const icon = ref();
const banner = ref();
let name = '';

RegisterEvent('club-edit-overlay', (club) => {
    name = club.name;
    react.colorStart = club.colors[0].color;
    react.colorEnd = club.colors[1].color;
    react.icon = Assets.ClubIcon(club);
    react.banner = Assets.ClubBanner(club);
    react.club = club;
    react.open = true;
});

function Perform() {
    API.PerformPatch(`/club/${react.club.id}`, {
        name: name,
        icon: getAsset(react.icon),
        banner: getAsset(react.banner),
        'color-start': react.colorStart,
        'color-end': react.colorEnd
    }).then(async (res) => {
        if (res.status != 200) {
            react.error = res.message;
            return;
        }

        await API.RefreshInfo(state.user?.id ?? 0);
        location.reload();
    });
}

function UpdateIcon() {
    Utils.GetB64FromInput(icon.value, allowedImages, (b64) => (react.icon = b64));
}

function UpdateBanner() {
    Utils.GetB64FromInput(banner.value, allowedImages, (b64) => (react.banner = b64));
}

function UpdateColor(v: string, end: boolean) {
    if (end) react.colorEnd = v;
    else react.colorStart = v;
}

function getAsset(b64) {
    if (!b64) return '';

    return b64.split(',')[1];
}
</script>

<template>
    <PanelOverlay title="Edit Club" :error="react.error" :open="react.open" :voidclick="() => (react.open = false)">
        <IconTextBox
            icon="font"
            :changed="(i) => (name = i)"
            placeholder="Name"
            maxlength="16"
            :value="react.club.name"
        />
        <div class="flex flex-row gap-4">
            <label for="icon">
                <img class="rounded-xl size-32 object-cover" :src="react.icon || DefaultClubIcon" alt="club icon" />
            </label>
            <input ref="icon" class="hidden" type="file" id="icon" :accept="allowedImages" @change="UpdateIcon" />
            <label for="banner" class="flex-grow">
                <img
                    class="w-full rounded-xl h-32 object-cover"
                    :src="react.banner || DefaultClubBanner"
                    alt="club banner"
                />
            </label>
            <input ref="banner" class="hidden" type="file" id="banner" :accept="allowedImages" @change="UpdateBanner" />
        </div>
        <div class="flex gap-2">
            <ColorPicker
                :color="react.colorStart"
                class="border-none size-12 rounded-xl"
                @input="(v) => UpdateColor(v, false)"
            />
            <div
                class="flex-grow h-12 rounded-xl"
                :style="`background: linear-gradient(90deg, ${react.colorStart}, ${react.colorEnd})`"
            ></div>
            <ColorPicker
                :color="react.colorEnd"
                class="border-none size-12 rounded-xl"
                @input="(v) => UpdateColor(v, true)"
            />
        </div>
        <div class="w-full flex justify-center">
            <RoundedButton class="w-fit flex flex-row items-center justify-center px-6 py-3" @click="Perform"
                >Update!
            </RoundedButton>
        </div>
    </PanelOverlay>
</template>
