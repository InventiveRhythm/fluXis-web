<script setup lang="ts">
definePageMeta({
    path: '/mapset/:id'
});

navigateTo(`/set/${useRoute().params.id}`, {
    replace: true
});
</script>

<template></template>
