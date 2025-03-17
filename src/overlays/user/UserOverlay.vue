<script setup>
import { useRouter } from 'vue-router';

import DefaultAvatar from '@/assets/images/defaults/avatar.png';
import DefaultBanner from '@/assets/images/defaults/banner.png';

import API from '@/utils/API';
import Assets from '@/utils/Assets';
import { Localize } from '@/utils/Localization';
import { state } from '@/utils/State';
import Overlays from '@/utils/Overlays';
import Utils from '@/utils/Utils';

const router = useRouter();

function userClick() {
    if (state.user) {
        router.push('/u/' + state.user.id);
    } else {
        API.OpenLogin();
    }
}

function SwitchLocale() {
    if (state.locale == 'en') {
        state.locale = 'de';
        return;
    }

    state.locale = 'en';
}
</script>

<template>
    <Transition name="user-overlay">
        <div
            @keydown.esc="Overlays.UserOverlay.value = false"
            v-if="Overlays.UserOverlay.value"
            class="fixed size-full top-0 left-0 pointer-events-auto bg-black bg-opacity-50"
            id="user-overlay"
            @click="Overlays.UserOverlay.value = false"
        >
            <div class="w-full md:w-auto wrapper absolute right-0 mt-20">
                <div class="w-full md:w-80 bg-dark-1 rounded-bl-2xl p-3">
                    <div class="overlap-grid h-40 rounded-lg cursor-pointer group leading-none" @click="userClick">
                        <img
                            :src="state.user ? Assets.Banner(state.user) : DefaultBanner"
                            class="object-cover"
                            alt="avatar"
                        />
                        <div class="bg-dark-2 opacity-50 transition-opacity group-hover:opacity-40"></div>
                        <div class="flex flex-col justify-center items-center">
                            <img
                                :src="state.user ? Assets.Avatar(state.user) : DefaultAvatar"
                                class="size-16 object-cover rounded-md mb-2 shadow-md"
                                alt="banner"
                            />

                            <div class="flex items-center gap-1 drop-shadow-text">
                                <span v-if="state.user">
                                    <i
                                        v-if="state.user.groups && state.user.groups.length > 0"
                                        :class="`${Utils.GetIconForGroup(state.user.groups[0].id)}`"
                                        :style="`color: ${state.user.groups[0].color}`"
                                    ></i>
                                    {{ state.user.displayname || state.user.username }}
                                </span>
                                <p v-else class="name">Not Logged in</p>
                            </div>

                            <p v-if="state.user && state.user.displayname" class="text-xs drop-shadow-text opacity-80">
                                {{ state.user.username }}
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col mt-2 gap-2">
                        <RouterLink
                            class="bg-dark-2 py-1 px-3 rounded-lg transition-colors text-sm hover:bg-dark-3"
                            to="/management"
                            v-if="state.user && Utils.IsModerator(state.user)"
                        >
                            Management
                        </RouterLink>
                        <div
                            class="bg-dark-2 py-1 px-3 rounded-lg transition-colors text-sm hover:bg-dark-3"
                            @click="SwitchLocale"
                        >
                            {{ Localize('overlays.locale') }}
                        </div>
                        <RouterLink
                            class="bg-dark-2 py-1 px-3 rounded-lg transition-colors text-sm hover:bg-dark-3"
                            to="/logout"
                            v-if="state.user"
                        >
                            {{ Localize('user.logout') }}
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style lang="scss">
.user-overlay-enter-active,
.user-overlay-leave-active {
    transition: opacity 150ms, transform 300ms;

    .wrapper > div {
        transition: all 300ms cubic-bezier(0.22, 1, 0.36, 1);
    }
}

.user-overlay-enter-to,
.user-overlay-leave-from {
    opacity: 1;
}

.user-overlay-enter-from,
.user-overlay-leave-to {
    opacity: 0;
    pointer-events: none;

    .wrapper > div {
        transform: translateY(-20px);
    }
}
</style>
