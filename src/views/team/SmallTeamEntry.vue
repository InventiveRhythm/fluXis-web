<script setup>
import LoadingImage from '@/components/LoadingImage.vue';
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
        <LoadingImage class="object-cover" :src="Assets.Banner({ id: id })" />
        <div class="section-gradient opacity-60"></div>
        <div class="flex flex-row items-center p-2 gap-2">
            <div class="size-8">
                <LoadingImage class="size-full object-cover rounded-md" :src="Assets.Avatar({ id: id })" />
            </div>
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