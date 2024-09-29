<script setup>
import { reactive, ref } from 'vue';

import PanelOverlay from '../PanelOverlay.vue';
import RoundedButton from '@/components/RoundedButton.vue';
import IconTextBox from '@/components/IconTextBox.vue';

import DefaultAvatar from '@/assets/images/defaults/avatar.png';
import DefaultBanner from '@/assets/images/defaults/banner.png';

import API from '@/utils/API';
import Assets from '@/utils/Assets';
import { registerEvent } from '@/utils/Events';
import { state } from '@/utils/State';
import Utils from '@/utils/Utils';

const react = reactive({
    open: false,
    user: null,
    avatar: "",
    banner: "",
    error: ""
})

const allowedImages = ["image/png", "image/jpeg"];

const nick = ref();
const about = ref();
const pronouns = ref();
const avatar = ref();
const banner = ref();

registerEvent('user-edit-overlay', user => {
    react.avatar = Assets.Avatar(user);
    react.banner = Assets.Banner(user);
    react.user = user;
    react.open = true;
});

function Perform() {
    API.PerformPatch(`/user/${react.user.id}`, {
        'nick': nick.value.input.value,
        'about': about.value.input.value,
        'pronouns': pronouns.value.input.value,
        'avatar': GetAsset(react.avatar),
        'banner': GetAsset(react.banner)
    }).then(async res => {
        if (res.status != 200) {
            react.error = res.message;
            return;
        }

        await API.RefreshInfo(state.user.id);
        location.reload();
    })
}

function UpdateAvatar() {
    Utils.GetB64FromInput(avatar.value, allowedImages, b64 => react.avatar = b64);
}

function UpdateBanner() {
    Utils.GetB64FromInput(banner.value, allowedImages, b64 => react.banner = b64);
}

function GetAsset(b64) {
    if (!b64)
        return "";

    return b64.split(",")[1];
}
</script>

<template>
    <PanelOverlay title="Edit Profile" :error="react.error" :open="react.open" :voidclick="() => react.open = false">
        <IconTextBox ref="nick" icon="font" placeholder="Display Name" maxlength="20" :value="react.user.displayname" />
        <IconTextBox ref="pronouns" icon="font" placeholder="Pronouns" maxlength="16" :value="react.user.pronouns" />
        <IconTextBox ref="about" icon="align-left" placeholder="About Me" maxlength="512" :value="react.user.aboutme" />
        <div class="flex flex-row gap-4">
            <label for="avatar">
                <img class="rounded-xl size-32 object-cover" :src="react.avatar || DefaultAvatar">
            </label>
            <input ref="avatar" class="hidden" type="file" id="avatar" :accept="allowedImages" @change="UpdateAvatar">
            <label for="banner" class="flex-grow">
                <img class="w-full rounded-xl h-32 object-cover" :src="react.banner || DefaultBanner">
            </label>
            <input ref="banner" class="hidden" type="file" id="banner" :accept="allowedImages" @change="UpdateBanner">
        </div>
        <div class="w-full flex justify-center">
            <RoundedButton class="w-fit flex flex-row items-center justify-center px-6 py-3" @click="Perform">Update!</RoundedButton>
        </div>
    </PanelOverlay>
</template>