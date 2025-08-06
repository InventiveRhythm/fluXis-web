<script setup lang="ts">
defineProps<{
    to: string;
    text: string;
    icon: string;
    sublinks?: {
        text: string;
        to: string;
    }[];
}>();
</script>

<template>
    <li class="group/item mx-2 hidden rounded-md px-3 py-2 transition-colors hover:bg-dark-text/20 lg:list-item">
        <NuxtLink :to="to">
            <i :class="`fa mr-1 min-w-4 fa-${icon}`"></i>
            {{ Localize(text) }}
        </NuxtLink>
        <div class="absolute hidden opacity-0 transition-all group-hover/item:block group-hover/item:opacity-100" v-if="sublinks">
            <div class="absolute -z-10 h-36 w-[calc(100vw*2)] -translate-x-1/2 bg-dark-3"></div>
            <div class="group/sub mt-9 flex flex-col">
                <NuxtLink :to="sub.to" class="text-sm transition-opacity hover:!opacity-100 group-has-[:hover]/sub:opacity-40" v-for="sub in sublinks">
                    {{ Localize(sub.text) }}
                </NuxtLink>
            </div>
        </div>
    </li>
</template>
