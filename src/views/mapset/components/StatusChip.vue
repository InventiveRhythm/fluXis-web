<script setup>
const props = defineProps({
    status: Number
});

function getStatusTag() {
    switch (props.status) {
        case -1: // actually blacklisted but we dont show that
            return "unsubmitted";
        case 0:
            return "unsubmitted";
        case 1:
            return "pending";
        case 2:
            return "impure";
        case 3:
            return "pure";
        default:
            return "unsubmitted";
    }
}

function getStatusName() {
    switch (props.status) {
        case -1:
            return "UNSUBMITTED";
        case 0:
            return "UNSUBMITTED";
        case 1:
            return "PENDING";
        case 2:
            return "IMPURE";
        case 3:
            return "PURE";
        default:
            return "User";
    }
}
</script>

<template>
    <div class="mapset-status-chip" :style="'background-color: var(--tag-status-' + getStatusTag() + ')'">
        <p>{{ getStatusName() }}</p>
    </div>
</template>

<style lang="scss">
.mapset-status-chip {
    display: flex;
    height: 30px;
    padding: 10px;
    justify-content: center;
    align-items: center;

    border-radius: 20px;

    p {
        color: black;
        opacity: .75;
        font-size: 14px;
    }
}</style>