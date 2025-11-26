<script setup lang="ts">
import type { APIMap } from '~/models/maps/APIMap';
import type { APIMapSet } from '~/models/maps/APIMapSet';

definePageMeta({
    alias: '/set/:id'
});

const props = defineProps<{
    mapset: APIMapSet;
    map: APIMap;
}>();

const { data: api_description } = await API.PerformGet<string>(`/mapset/${props.mapset.id}/description`);
const description = api_description ?? "No Description Provided.";
</script>

<template>
    <div class="flex w-full flex-col gap-3 pt-2">
        <MapSetInfoSection title="Description">
            <MapSetDescription :text=description :mapset=mapset />
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
