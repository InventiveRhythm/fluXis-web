<script setup lang="ts">
import { ref, computed } from 'vue';
import type { APIMapSet } from '~/models/maps/APIMapSet';
import API from '~/utils/api';

const props = defineProps<{
    mapset: APIMapSet;
}>();

const description = ref('');
const isFetching = ref(true);
const isSaving = ref(false);
const fetchError = ref<string | null>(null);

try {
    const { data } = await API.PerformGet<string>(`/mapset/${props.mapset.id}/description`);
    description.value = data ?? '';
} catch {
    fetchError.value = 'Failed to load description.';
} finally {
    isFetching.value = false;
}

const canEdit = computed(
    () =>
        utils.IsModerator(API.CurrentUser.value) ||
        API.CurrentUser.value?.id === props.mapset.creator.id
);

const handleSave = async (value: string) => {
    isSaving.value = true;
    try {
        await API.PerformPatch<string | null>(
            `/mapset/${props.mapset.id}/description`,
            JSON.stringify(value || null)
        );
        description.value = value;
    } catch {
        console.error('Failed to save description.');
    } finally {
        isSaving.value = false;
    }
};
</script>

<template>
    <div v-if="fetchError" class="error-message">{{ fetchError }}</div>

    <MarkdownEditor
        v-else
        v-model="description"
        :can-edit="canEdit && !isSaving"
        :loading="isFetching || isSaving"
        :max-characters="4000"
        :sanitize="true"
        max-height="400px"
        placeholder="No description provided."
		edit-placeholder="Enter description..."
		loading-placeholder="Loading description..."
        @save="handleSave"
    />
</template>