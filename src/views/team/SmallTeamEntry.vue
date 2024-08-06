<script setup>
import Assets from '@/utils/Assets';

const props = defineProps({
    name: String,
    id: Number,
    role: Number
});

function getRoleName(role) {
    switch (role) {
        case 2:
            return 'Purifier';
        case 3:
            return 'Moderator';
    }
}
</script>

<template>
    <div class="overlap-grid w-full h-12 rounded-md">
        <img class="object-cover" :src="Assets.banner(id)" animated-load>
        <div class="section-gradient opacity-60"></div>
        <div class="flex flex-row items-center p-2 gap-2">
            <img class="size-8 object-cover rounded-md" :src="Assets.avatar(id)" animated-load>
            <div class="text-left leading-none">
                <p>{{ name }}</p>
                <p class="text-xs" :class="{
                    'text-group-purifier': role == 2,
                    'text-group-moderators': role == 3
                }">{{ getRoleName(role) }}</p>
            </div>
        </div>
    </div>
</template>