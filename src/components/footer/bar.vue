<script setup lang="ts">
const socials = [
    {
        label: 'GitHub',
        url: 'https://github.com/InventiveRhythm',
        icon: 'fab fa-github'
    },
    {
        label: 'Discord',
        url: 'https://discord.gg/29hMftpNq9',
        icon: 'fab fa-discord'
    },
    {
        label: 'Twitter',
        url: 'https://twitter.com/fluXisGame',
        icon: 'fab fa-twitter'
    },
    {
        label: 'YouTube',
        url: 'https://youtube.com/@fluXisGame',
        icon: 'fab fa-youtube'
    }
];

const links = [
    {
        text: 'Terms',
        url: '/wiki/legal/terms'
    },
    {
        text: 'Privacy',
        url: '/wiki/legal/privacy'
    },
    {
        text: 'DMCA',
        url: '/wiki/legal/dmca'
    }
];
</script>

<template>
    <div class="bottom-0 flex h-24 w-full cursor-default flex-col items-center justify-center pb-5 text-2xs">
        <div class="flex flex-wrap justify-center">
            <a :href="social.url" class="px-2 py-1 hover:text-highlight" :aria-label="social.label" target="_blank" v-for="social in socials">
                <i class="text-base" :class="social.icon"></i>
            </a>
        </div>
        <div class="flex flex-wrap justify-center text-sm">
            <RouterLink class="px-2 py-1 hover:text-highlight" :to="link.url" v-for="link in links">
                {{ link.text }}
            </RouterLink>
        </div>
        <span>
            Copyright © 2022-{{ new Date().getFullYear() }}
            <a href="https://flux.moe" target="_blank">flustix</a>
        </span>
    </div>
</template>
