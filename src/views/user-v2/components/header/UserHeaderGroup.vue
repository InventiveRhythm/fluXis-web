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
    <div class="group" :style="'color: ' + group.color">
        <i :class="getIcon()"></i>
        <p>{{ group.name }}</p>
    </div>
</template>

<style lang="scss">
.group {
    display: flex;
    height: 30px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 5px;

    border-radius: 20px;
    background: rgba(34, 34, 42, 0.50);

    i { width: 20px; }
    p { font-size: 14px; }
}
</style>