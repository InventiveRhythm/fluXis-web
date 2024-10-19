<script setup lang="ts">
import LoadingImage from '../LoadingImage.vue';

import DefaultAvatar from '@/assets/images/defaults/avatar.png';

import API from '@/utils/API';
import Assets from '@/utils/Assets';
import Overlays from '@/utils/Overlays';
import { state } from '@/utils/State';

function OnClick(e: MouseEvent) {
    if (e.button == 0) {
        Overlays.ToggleUserOverlay();
    }

    if (e.button == 1 && state.user) {
        e.preventDefault();
        API.RefreshInfo(state.user.id);
    }

    if (e.button == 2 && state.user) {
        e.preventDefault();
        if (confirm('Are you sure you want to log out?')) {
            API.Logout()
        }
    }
}
</script>

<template>
    <div class="size-24 flex items-center justify-center rounded-bl-3xl bg-dark-3 hover:bg-dark-4 transition-colors" tabindex="0" role="button" :aria-expanded="Overlays.UserOverlay.value" @click="OnClick" @keydown.space="Overlays.ToggleUserOverlay">
        <LoadingImage class="size-16 rounded-lg" :src="state.user ? Assets.Avatar(state.user) : DefaultAvatar"
                      alt="user avatar" />
    </div>
</template>