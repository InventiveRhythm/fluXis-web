<script setup lang="ts">
import LogoText from '@/assets/image/logo-text.png';
import API from '~/utils/api';

const show = ref(false);
const submenu = ref('');

type NavLink = {
    text: string;
    to: string;
    icon: string;
    sublinks?: {
        text: string;
        to: string;
    }[];
};

const links: NavLink[] = [
    {
        text: 'nav.home',
        to: '/',
        icon: 'home',
        sublinks: [
            {
                text: 'nav.news',
                to: '/news'
            },
            {
                text: 'nav.team',
                to: '/team'
            },
            {
                text: 'nav.changelogs',
                to: 'https://github.com/InventiveRhythm/fluXis/releases'
            },
            {
                text: 'generic.download',
                to: API.SteamDownload
            }
        ]
    },
    {
        text: 'nav.maps',
        to: '/maps',
        icon: 'map',
        sublinks: [
            {
                text: 'nav.maplisting',
                to: '/maps'
            },
            {
                text: 'nav.featured',
                to: '/artists'
            },
            {
                text: 'nav.queue',
                to: '/maps/queue'
            }
        ]
    },
    {
        text: 'nav.ranks',
        to: '/rankings/overall',
        icon: 'trophy',
        sublinks: [
            {
                text: 'stats.overall',
                to: '/rankings/overall'
            },
            /* {
                text: 'stats.potential',
                to: '/rankings/potential'
            }, */
            {
                text: 'nav.mostplayed',
                to: '/rankings/mapplays'
            },
            /* {
                text: 'nav.country',
                to: '/rankings/country'
            } */
        ]
    },
    {
        text: 'nav.clubs',
        to: '/clubs',
        icon: 'circle-nodes'
    },
    {
        text: 'nav.wiki',
        to: '/wiki',
        icon: 'book'
    }
];

function ClickLink(link: NavLink) {
    if (link.sublinks && link.sublinks.length > 0) {
        submenu.value = link.text;
        return;
    }

    HideMenu();
}

function HideMenu() {
    submenu.value = '';
    show.value = false;
}

function ToggleMenu() {
    submenu.value = '';
    show.value = !show.value;
}
</script>

<template>
    <div class="fixed left-0 top-0 z-50 h-20 w-full">
        <nav class="absolute flex size-full flex-row items-center justify-between bg-dark-2">
            <div class="flex w-24 items-center justify-center lg:hidden">
                <i @click="ToggleMenu" class="fa fa-bars rounded-lg p-3 hover:bg-dark-text/20"></i>
            </div>
            <div class="flex items-center px-3">
                <NuxtLink to="/" class="flex w-36 items-center justify-center rounded-lg !bg-opacity-20 p-2 transition-all hover:bg-dark-text active:scale-95">
                    <img class="h-10" :src="LogoText" alt="logo text" />
                </NuxtLink>

                <ul class="flex flex-row">
                    <NavigationLink :text="link.text" :to="link.to" :icon="link.icon" :sublinks="link.sublinks" v-for="link in links" />
                </ul>
            </div>
            <NavigationProfile />
        </nav>
        <div class="mt-20 flex flex-col bg-dark-3 px-4 py-2 shadow-lg" v-if="show">
            <template v-if="!submenu">
                <NavigationMobileLink
                    @click="ClickLink(link)"
                    :text="link.text"
                    :icon="link.icon"
                    :to="link.to"
                    :submenu="(link.sublinks?.length ?? 0) > 0"
                    v-for="link in links"
                />
            </template>
            <template v-else>
                <NavigationMobileLink @click="submenu = ''" icon="angle-left" text="Back" to="/" :submenu="true" />
                <NavigationMobileLink
                    @click="HideMenu"
                    :text="link?.text"
                    :to="link?.to"
                    :submenu="false"
                    v-for="link in links.find((x) => x.text == submenu)?.sublinks"
                />
            </template>
        </div>
    </div>
</template>
