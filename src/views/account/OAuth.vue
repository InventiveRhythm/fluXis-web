<script setup>
// get token query parameter
const token = new URLSearchParams(window.location.search).get('token');

if (token) {
    window.addEventListener("message", (event) => {
        if (!event.source)
            return;

	    event.source.postMessage({ token });
    });
}
</script>

<template>
</template>