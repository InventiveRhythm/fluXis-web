<script setup>
const props = defineProps({
    role: Number
});

function getRoleTag() {
    switch (props.role) {
        case 1:
            return "featured-artist";
        case 2:
            return "purifier";
        case 3:
            return "moderator";
        case 4:
            return "admin";
        case 5:
            return "fluxel";
        default:
            return "user";
    }
}

function getRoleName() {
    switch (props.role) {
        case 1:
            return "Featured Artist";
        case 2:
            return "Purifier";
        case 3:
            return "Moderator";
        case 4:
            return "Admin";
        case 5:
            return "fluxel";
        default:
            return "User";
    }
}

function getRoleIcon() {
    switch (props.role) {
        case 1: // featured artist
            return "fas fa-star";
        case 2: // purifier
            return "fas fa-diamond";
        case 3: // moderator
            return "fas fa-shield-halved";
        case 4: // admin
            return "fas fa-user-shield";
        case 5: // fluxel
            return "fas fa-user-astronaut";
        default:
            return "fas fa-user";
    }
}
</script>

<template>
    <div class="role" :style="'color: var(--tag-role-' + getRoleTag() + ')'">
        <i :class="getRoleIcon()"></i>
        <p>{{ getRoleName() }}</p>
    </div>
</template>

<style lang="scss">
.role {
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