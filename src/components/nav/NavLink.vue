<script setup lang="ts">
import { Localize } from '@/utils/Localization';

defineProps<{
    to: string
    icon: string
    text: string
    dropdown?: {
        to: string
        text: string
    }[]
    showDropdown: boolean
}>();
</script>

<template>
    <div
        class="hidden lg:flex flex-col items-start px-3 py-2 mx-2 rounded-md transition-colors !bg-opacity-20 hover:bg-white">
        <RouterLink :to="to" class="text-base leading-none">
            <i :class="'mr-1 fa fa-' + icon"></i>
            {{ Localize(text) }}
        </RouterLink>
        <div class="absolute mt-7 pt-9 group" v-if="dropdown && dropdown.length > 0 && showDropdown">
            <div class="flex flex-col justify-start items-start gap-1">
                <RouterLink class="text-sm w-full hover:!opacity-100 group-has-[:hover]:opacity-60"
                    v-for="link in dropdown" :key="link.to" :to="link.to">
                    {{ Localize(link.text) }}
                </RouterLink>
            </div>
        </div>
    </div>
</template>