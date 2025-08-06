<script setup lang="ts">
defineProps<{
    to: string;
    text: string;
    icon?: string;
    submenu: boolean;
}>();
</script>

<template>
    <div class="flex h-9 w-full flex-row items-center text-sm" v-if="submenu">
        <i :class="`fa mr-2 fa-${icon}`" v-if="icon"></i>
        {{ Localize(text) }}
        <i :class="`fa fa-angle-right ml-2 opacity-50`" v-if="text != 'Back'"></i>
    </div>
    <NuxtLink :to="to" class="flex h-9 w-full flex-row items-center text-sm" v-else>
        <i :class="`fa mr-2 fa-${icon}`" v-if="icon"></i>
        {{ Localize(text) }}
    </NuxtLink>
</template>
