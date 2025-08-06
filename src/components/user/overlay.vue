<script setup lang="ts">
import DefaultAvatar from '@/assets/image/defaults/avatar.png';
import DefaultBanner from '@/assets/image/defaults/banner.png';
import API from '~/utils/api';
import Assets from '~/utils/assets';
import Utils from '~/utils/utils';

function BoxClick() {
    if (!API.CurrentUser.value) {
        API.OpenLogin();
        return;
    }

    navigateTo(`/u/${API.CurrentUser.value.id}`)
}

function Close() {
    state.overlays.navuser = false;
}
</script>

<template>
    <Transition name="user-overlay">
        <div class="pointer-events-auto fixed left-0 top-0 size-full bg-black bg-opacity-50" @click="Close" @keydown.esc="Close" v-if="state.overlays.navuser">
            <div class="wrapper absolute right-0 mt-20 w-full md:w-auto">
                <div class="w-full bg-dark-1 p-3 md:w-80 md:rounded-bl-2xl">
                    <div class="overlap-grid group h-40 cursor-pointer rounded-lg leading-none" @click="BoxClick">
                        <LoadingImage class="object-cover" :src="Assets.Banner(API.CurrentUser.value)" />
                        <div class="bg-dark-2 opacity-50 transition-opacity group-hover:opacity-40"></div>
                        <div class="flex flex-col items-center justify-center">
                            <LoadingImage
                                class="mb-2 size-16 rounded-md object-cover"
                                :src="Assets.Avatar(API.CurrentUser.value)"
                            />

                            <div class="flex items-center gap-1">
                                <span v-if="API.CurrentUser.value">
                                    <i
                                        v-for="group in API.CurrentUser.value.groups"
                                        :class="`${Utils.GetIconForGroup(group.id)}`"
                                        :style="`color: ${group.color}`"
                                    ></i>
                                    {{ API.CurrentUser.value.displayname || API.CurrentUser.value.username }}
                                </span>
                                <p v-else class="name">Not Logged in</p>
                            </div>

                            <p v-if="API.CurrentUser.value && API.CurrentUser.value.displayname" class="text-xs opacity-80">
                                {{ API.CurrentUser.value.username }}
                            </p>
                        </div>
                    </div>

                    <div class="mt-2 flex flex-col gap-2" v-if="API.CurrentUser.value">
                        <NuxtLink
                            to="/management"
                            class="rounded-lg bg-dark-2 px-3 py-1 text-sm transition-colors hover:bg-dark-3"
                            v-if="Utils.IsModerator(API.CurrentUser.value)"
                        >
                            Management
                        </NuxtLink>
                        <div class="rounded-lg bg-dark-2 px-3 py-1 text-sm transition-colors hover:bg-dark-3" @click="API.Logout">
                            {{ Localize('user.logout') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style lang="scss">
.user-overlay-enter-active,
.user-overlay-leave-active {
    transition:
        opacity 200ms,
        transform 400ms;

    .wrapper > div {
        transition: all 400ms cubic-bezier(0.22, 1, 0.36, 1);
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
        transform: translateY(-10px);
    }
}
</style>
