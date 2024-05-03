<script setup>
import { RouterLink, } from "vue-router";

import FluXisText from "@/assets/images/logo-text.png";

import NavLink from "./NavLink.vue";
import NavProfile from "./NavProfile.vue";

const links = [
    {
        text: "Home",
        to: "/",
        icon: "home",
        sublinks: [
            {
                text: "News",
                to: "/news",
            },
            {
                text: "Team",
                to: "/team",
            },
            {
                text: "Changelog",
                to: "/changelog",
            },
            {
                text: "Download",
                to: "/download",
            }
        ],
    },
    {
        text: "Maps",
        to: "/maps",
        icon: "map",
        sublinks: [
            {
                text: "Map Listing",
                to: "/maps",
            },
            {
                text: "Featured Artists",
                to: "/maps/artists",
            }
        ],
    },
    {
        text: "Rankings",
        to: "/rankings/overall",
        icon: "trophy",
        sublinks: [
            {
                text: "Overall Rating",
                to: "/rankings/overall",
            },
            {
                text: "Potential Rating",
                to: "/rankings/potential",
            },
            {
                text: "Most Played Maps",
                to: "/rankings/mostPlayed",
            },
            {
                text: "Country Rankings",
                to: "/rankings/country",
            }
        ],
    },
    {
        text: "Wiki",
        to: "/wiki",
        icon: "book",
    }
];
</script>

<template>
    <div class="w-full h-20 fixed top-0 z-50">
        <div class="size-full flex justify-between items-center bg-dark-2 shadow-normal">
            <div class="w-24 md:hidden"></div>
            <div class="flex items-center px-3">
                <RouterLink to="/">
                    <div class="flex items-center p-3 rounded-lg transition-colors !bg-opacity-20 hover:bg-white">
                        <img class="h-10" :src="FluXisText" alt="fluXis" />
                    </div>
                </RouterLink>

                <NavLink v-for="link in links" :key="link.to" :to="link.to" :icon="link.icon" :text="link.text" :dropdown="link.sublinks" />
            </div>
            <NavProfile />
        </div>
    </div>
</template>