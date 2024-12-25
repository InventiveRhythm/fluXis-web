<script setup lang="ts">
import { RouterLink, } from "vue-router";
import { reactive } from "vue";

import FluXisText from "@/assets/images/logo-text.png";

import NavLink from "./NavLink.vue";
import NavProfile from "./NavProfile.vue";

const react = reactive({
    showExtra: false,
    currentLink: "",
    lastLink: "",
});

const links = [
    {
        text: "nav.home",
        id: "home",
        to: "/",
        icon: "home",
        sublinks: [
            {
                text: "nav.news",
                to: "/news",
            },
            {
                text: "nav.team",
                to: "/team",
            },
            {
                text: "nav.changelogs",
                to: "/changelog",
            },
            {
                text: "generic.download",
                to: "/download",
            }
        ],
    },
    {
        text: "nav.maps",
        id: "maps",
        to: "/maps",
        icon: "map",
        sublinks: [
            {
                text: "nav.maplisting",
                to: "/maps",
            },
            {
                text: "nav.featured",
                to: "/artists",
            }
        ],
    },
    {
        text: "nav.ranks",
        id: "ranks",
        to: "/rankings/overall",
        icon: "trophy",
        sublinks: [
            {
                text: "stats.overall",
                to: "/rankings/overall",
            },
            {
                text: "stats.potential",
                to: "/rankings/potential",
            },
            {
                text: "nav.mostplayed",
                to: "/rankings/mostPlayed",
            },
            {
                text: "nav.country",
                to: "/rankings/country",
            }
        ],
    },
    {
        text: "nav.clubs",
        id: "clubs",
        to: "/clubs",
        icon: "circle-nodes",
    },
    {
        text: "nav.wiki",
        id: "wiki",
        to: "/wiki",
        icon: "book",
    }
];

function linkHovered(link: string) {
    const data = links.find(e => e.id == link);

    if (!data || !data.sublinks) {
        react.showExtra = false;
        return;
    }

    react.showExtra = true;
    react.currentLink = link;
    react.lastLink = link;
}

function stopHover() {
    react.showExtra = false;
    react.currentLink = "";
}
</script>

<template>
    <div class="w-full h-20 fixed top-0 z-50">
        <Transition name="nav-fade">
            <div class="absolute w-full h-56 bg-dark-3" v-if="react.showExtra" ></div>
        </Transition>
        <div class="absolute size-full flex justify-between items-center bg-dark-2 shadow-normal">
            <div class="w-24 lg:hidden"></div>
            <div class="flex items-center px-3">
                <RouterLink to="/">
                    <div class="flex items-center p-3 rounded-lg transition-colors !bg-opacity-20 hover:bg-white">
                        <img class="h-10" :src="FluXisText" alt="fluXis" />
                    </div>
                </RouterLink>

                <NavLink @mouseover="linkHovered(link.id)" @mouseleave="stopHover" v-for="link in links" :key="link.to" :to="link.to" :icon="link.icon" :text="link.text" :dropdown="link.sublinks" :showDropdown="react.currentLink == link.id" />
            </div>
            <NavProfile />
        </div>
    </div>
</template>

<style>
.nav-fade-enter-active,
.nav-fade-leave-active {
    transition: all 300ms;
}

.nav-fade-enter-to,
.nav-fade-leave-from {
    opacity: 1;
    transition-duration: 0ms;
}

.nav-fade-enter-from,
.nav-fade-leave-to {
    opacity: 0;
}
</style>