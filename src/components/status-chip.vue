<script setup lang="ts">
import { APIMapSetStatus } from '~/models/maps/APIMapSetStatus';

const props = defineProps<{
    status: APIMapSetStatus;
}>();

function GetString() {
    switch (props.status) {
        case APIMapSetStatus.Blacklisted:
        case APIMapSetStatus.Unsubmitted:
            return 'UNSUBMITTED';

        case APIMapSetStatus.Pending:
            return 'PENDING';

        case APIMapSetStatus.Impure:
            return 'IMPURE';

        case APIMapSetStatus.Pure:
            return 'PURE';
    }
}
</script>

<template>
    <div :class="`flex h-8 items-center justify-center rounded-full p-3 bg-status-${GetString().toLowerCase()}`">
        <p class="text-black/75 text-sm">{{ GetString() }}</p>
    </div>
</template>
