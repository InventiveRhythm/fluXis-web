<script setup lang="ts">
import { ref, computed } from 'vue';
import type { APIMapSet } from '~/models/maps/APIMapSet';

const props = defineProps<{
  mapset: APIMapSet
}>();

const isLoaded = ref(false);
const description = ref('');

const { data: api_description } = await API.PerformGet<string>(
  `/mapset/${props.mapset.id}/description`
);

description.value = api_description ?? "No Description Provided.";

const canEdit = computed(() => {
  return (
    utils.IsModerator(API.CurrentUser.value) ||
    API.CurrentUser.value?.id === props.mapset.creator.id
  );
});

const handleSave = async (value: string) => {
  await API.PerformPatch<string | null>(
    `/mapset/${props.mapset.id}/description`,
    JSON.stringify(value || null)
  );
  description.value = value;
};
</script>

<template>
  <MarkdownEditor
    v-model="description"
    :can-edit="canEdit"
    :max-characters="2000"
    max-height="400px"
    placeholder="No description provided."
    @save="handleSave"
  />
</template>