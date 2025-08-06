<script setup lang="ts">
import type { APIMap } from '~/models/maps/APIMap';
import type { APIMapSet } from '~/models/maps/APIMapSet';

definePageMeta({
    alias: '/set/:id'
});

defineProps<{
    mapset: APIMapSet;
    map: APIMap;
}>();
</script>

<template>
    <div class="flex w-full flex-col gap-3 pt-2">
        <MapSetInfoSection title="Description">
            <p class="text-sm" v-if="mapset.description">{{ mapset.description }}</p>
            <p class="text-sm italic" v-else>No description provided.</p>
        </MapSetInfoSection>
        <MapSetInfoSection title="Source">
            <p class="text-sm" v-if="map.source">{{ map.source }}</p>
            <p class="text-sm italic" v-else>No source provided.</p>
        </MapSetInfoSection>
        <MapSetInfoSection title="Tags">
            <p class="text-sm" v-if="map.tags">
                <span class="mr-2 transition-colors duration-75 hover:text-highlight" v-for="tag in map.tags.split(',')">
                    {{ tag.trim() }}
                </span>
            </p>
            <p class="text-sm italic" v-else>No tags provided.</p>
        </MapSetInfoSection>
    </div>
</template>
