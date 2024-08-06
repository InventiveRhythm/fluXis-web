<script setup>
import { reactive } from "vue";
import { useRouter } from 'vue-router';

import { registerEvent } from '@/utils/Events';
import API from "@/utils/API";
import Assets from "@/utils/Assets";
import { state } from "@/utils/State";

const router = useRouter();

const react = reactive({
    open: false
});

registerEvent('toggle-user-overlay', () => react.open = !react.open);

function userClick() {
    if (state.user) {
        router.push('/u/' + state.user.id);
    }
    else {
        API.OpenLogin();
    }

    react.open = false;
}

function getRoleTag(roleid) {
    switch (roleid) {
        case 1:
            return "featured-artist";
        case 2:
            return "purifier";
        case 3:
            return "moderator";
        case 4:
            return "admin";
        case 5:
            return "fluxel";
        default:
            return "";
    }
}
</script>

<template>
    <Transition name="user-overlay">
        <div v-if="react.open" class="fixed size-full top-0 left-0 pointer-events-auto"
            id="user-overlay">
            <div class="absolute size-full bg-black opacity-50" @click="react.open = false"></div>
            <div class="w-full relative my-auto">
                <div class="wrapper absolute right-0 mt-20">
                    <div class="w-80 bg-dark-1 rounded-bl-2xl p-3">
                        <div class="overlap-grid h-40 rounded-lg cursor-pointer group leading-none" @click="userClick">
                            <img :src="state.user ? Assets.banner(state.user.id) : Assets.banner(-1)" class="object-cover" />
                            <div class="bg-dark-2 opacity-50 transition-opacity group-hover:opacity-40"></div>
                            <div class="flex flex-col justify-center items-center" >
                                <img :src="state.user ? Assets.avatar(state.user.id) : Assets.avatar(-1)"
                                    class="size-16 object-cover rounded-md mb-2 shadow-md">

                                <div class="flex items-center gap-1 drop-shadow-text">
                                    <p v-if="state.user && state.user.displayname"> {{ state.user.displayname }}</p>
                                    <p v-else-if="state.user">{{ state.user.username }}</p>
                                    <p v-else class="name">Not Logged in</p>
                                </div>

                                <p v-if="state.user && state.user.displayname"
                                    class="text-xs drop-shadow-text opacity-80">{{ state.user.username }}</p>
                            </div>
                        </div>
                        <div class="flex flex-col mt-2" v-if="state.user">
                            <RouterLink class="bg-dark-2 py-1 px-3 rounded-lg transition-colors text-sm hover:bg-dark-3"
                                to="/logout">
                                Log out
                            </RouterLink>
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
    transition: all 300ms;

    .wrapper > div {
        transition: all 600ms cubic-bezier(0.22, 1, 0.36, 1);
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