<script setup lang="ts">
definePageMeta({
    path: '/mapsets/:id'
});

navigateTo(`/set/${useRoute().params.id}`, {
    replace: true
});
</script>

<template></template>
