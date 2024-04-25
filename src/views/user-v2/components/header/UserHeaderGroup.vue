<script setup>
const props = defineProps({
    group: Object
});

function getIcon() {
    switch (props.group.id.toLowerCase()) {
        case "contributors":
            return "fas fa-medal";
        case "fa":
            return "fas fa-star";
        case "purifier":
            return "fas fa-diamond";
        case "moderators":
            return "fas fa-shield";
        case "dev":
            return "fas fa-screwdriver-wrench";
        case "bot":
            return "fas fa-user-astronaut";
        default:
            return "fas fa-user";
    }
}
</script>

<template>
    <div class="flex h-8 p-3 justify-center items-center gap-2 bg-dark-2 bg-opacity-50 rounded-full" :style="'color: ' + group.color">
        <i :class="getIcon() + ' w-5'"></i>
        <p class="text-sm">{{ group.name }}</p>
    </div>
</template>