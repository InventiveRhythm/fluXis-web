<script setup lang="ts">
function InviteUser() {
    window.alert('wip...')
}
</script>

<template>
    <div class="w-full bg-dark-2 p-4 rounded-xl">
        <p class="text-left text-lg">Not in a club.</p>
        <p @click="InviteUser" class="text-right text-sm text-primary hover:underline cursor-pointer">Invite them!</p>
    </div>
</template>