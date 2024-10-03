<script setup>
defineProps({
    map: Object
});

function GetPercentage(up, down) {
    if (!up && !down)
        return 50

    return Math.floor((up / (up + down)) * 100)
}
</script>

<template>
    <div class="w-full flex flex-col gap-1.5">
        <div class="w-full h-2 bg-vote-down rounded-full">
            <div class="h-full bg-vote-up rounded-full transition-all" :style="`width: ${GetPercentage(map.ups, map.downs)}%`"></div>
        </div>
        <div class="w-full flex flex-row justify-between">
            <p class="text-sm w-12 text-vote-up">{{ map.ups }}</p>
            <p class="text-sm w-12 text-center">{{ GetPercentage(map.ups, map.downs) }}%</p>
            <p class="text-sm w-12 text-right text-vote-down">{{ map.downs }}</p>
        </div>
    </div>
</template>