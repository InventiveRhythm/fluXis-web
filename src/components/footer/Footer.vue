<script setup lang="ts">
const socials = [{
    url: 'https://github.com/InventiveRhythm',
    icon: 'fab fa-github'
}, {
    url: 'https://discord.gg/29hMftpNq9',
    icon: 'fab fa-discord'
}, {
    url: 'https://twitter.com/fluXisGame',
    icon: 'fab fa-twitter'
}, {
    url: 'https://youtube.com/@fluXisGame',
    icon: 'fab fa-youtube'
}];

const links = [{
    text: 'Terms',
    url: '/wiki/legal/terms'
}, {
    text: 'Privacy',
    url: '/wiki/legal/privacy'
}, {
    text: 'DMCA',
    url: '/wiki/legal/dmca'
}];
</script>

<template>
    <div class="w-full h-24 pb-5 flex flex-col items-center justify-center text-2xs cursor-default absolute bottom-0">
        <div class="flex flex-wrap justify-center">
            <a :href="social.url" class="py-1 px-2 hover:text-highlight" target="_blank" v-for="social in socials">
                <i class="text-base" :class="social.icon"></i>
            </a>
        </div>
        <div class="flex flex-wrap justify-center text-sm">
            <RouterLink class="py-1 px-2 hover:text-highlight" :to="link.url" v-for="link in links">
                {{ link.text }}
            </RouterLink>
        </div>
        <span>
            Copyright © 2022-{{ new Date().getFullYear() }}
            <a href="https://flux.moe" target="_blank">flustix</a>
        </span>
    </div>
</template>