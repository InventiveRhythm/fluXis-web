<script setup lang="ts">
import { ref, computed } from 'vue';
import type { APIMapSet } from '~/models/maps/APIMapSet';
import API from '~/utils/api';

const noDescPlaceholder = "No description provided.";
const loadingDescPlaceholder = "No description provided.";
const descMaxHeight = "400px"

const props = defineProps<{
    mapset: APIMapSet;
}>();

const description = ref('');
const isFetching = ref(true);
const isSaving = ref(false);
const fetchError = ref<string | null>(null);

try {
    const { data } = await API.PerformGet<string>(`/mapsets/${props.mapset.id}/description`);
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
            `/mapsets/${props.mapset.id}/description`,
            {content : value || ""}
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

    <MarkdownViewer
        v-else-if="!canEdit"
        :model-value="description"
        :loading="isFetching"
        :max-height="descMaxHeight"
        :placeholder="noDescPlaceholder"
        :loading-placeholder="loadingDescPlaceholder"
    />

    <MarkdownEditor
        v-else
        v-model="description"
        :can-edit="!isSaving"
        :loading="isFetching || isSaving"
        :max-characters="api.DescriptionMaxCharLimit"
        :sanitize="true"
        :max-height="descMaxHeight"
        :placeholder="noDescPlaceholder"
        edit-placeholder="Enter description..."
        :loading-placeholder="loadingDescPlaceholder"
        @save="handleSave"
    />
</template>