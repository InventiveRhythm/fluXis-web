<script setup lang="ts">
definePageMeta({
    layout: 'auth'
});

// get token query parameter
const params = new URLSearchParams(window.location.search);
const token = params.get('token');
const user = params.get('user');

if (token && user) {
    window.addEventListener('message', (event) => {
        if (!event.source) {
            console.log('no source');
            return;
        }

        console.log('source: ', event.origin);
        console.log('current: ', window.location.origin);

        // make sure the sender is the same url
        if (event.origin !== window.location.origin) {
            console.log("origin doesn't match, aborting for security reasons");
            return;
        }

        event.source.postMessage({
            token,
            user
        });
    });
}
</script>

<template></template>
