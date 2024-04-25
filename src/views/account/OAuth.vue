<script setup>
// get token query parameter
const token = new URLSearchParams(window.location.search).get('token');

if (token) {
    window.addEventListener("message", (event) => {
        if (!event.source) {
            console.log('no source');
            return;
        }

        console.log('source: ', event.origin);
        console.log('current: ', window.location.origin);

        // make sure the sender is the same url
        if (event.origin !== window.location.origin)  {
            console.log('origin doesn\'t match, aborting for security reasons');
            return;
        }

	    event.source.postMessage({ token });
    });
}
</script>

<template>
</template>