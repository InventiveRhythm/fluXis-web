<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { APIMapSet } from '~/models/maps/APIMapSet';
import Markdown from '~/utils/markdown';

const props = defineProps<{
  mapset: APIMapSet
}>();

const MAX_CHARACTERS = 2000;
const MAX_HEIGHT = '400px';

const isLoaded = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const editedText = ref('');
const renderedMarkdownContent = ref('');

const { data: api_description } = await API.PerformGet<string>(`/mapset/${props.mapset.id}/description`).finally(() => isLoaded.value = true);
const text = api_description ?? "No Description Provided.";

watch(() => text, async (newText) => {
  const content = editedText.value || newText || '';
  renderedMarkdownContent.value = await Markdown.Render(content, false);
}, { immediate: true });

watch(editedText, async (newText) => {
  if (newText) {
    renderedMarkdownContent.value = await Markdown.Render(newText, false);
  }
});

const canEdit = computed(() => {
  return (
    utils.IsModerator(API.CurrentUser.value) ||
    API.CurrentUser.value?.id === props.mapset.creator.id
  );
});

const charactersRemaining = computed(() => {
  return MAX_CHARACTERS - editedText.value.length;
});

const isOverLimit = computed(() => {
  return editedText.value.length > MAX_CHARACTERS;
});

const toggleMode = () => {
  if (isEditing.value) {
    isEditing.value = false;
  } else {
    editedText.value = editedText.value || text || '';
    isEditing.value = true;
  }
};

const cancelEdit = () => {
  isEditing.value = false;
  editedText.value = '';
};

const saveDescription = async () => {
  if (isSaving.value || isOverLimit.value) return;
  
  try {
    isSaving.value = true;
    
    await API.PerformPatch<string | null>(
      `/mapset/${props.mapset.id}/description`,
      JSON.stringify(editedText.value || null)
    );
    
    isEditing.value = false;
  } catch (error) {
    console.error('Failed to save description:', error);
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <div class="relative p-4">
    <LoadingIndicator v-if="!isLoaded" />

    <button
      v-if="canEdit"
      @click="toggleMode"
      class="absolute top-4 right-10 hover:opacity-70 transition-opacity z-10"
      :title="isEditing ? 'Preview' : 'Edit description'"
    >
      <i :class="isEditing ? 'fa-solid fa-book' : 'fa-solid fa-pen'" class="text-sm"></i>
    </button>

    <!-- view mode -->

    <div v-if="!isEditing" class="overflow-hidden">
      <div 
        v-if="text" 
        v-html="renderedMarkdownContent" 
        class="max-w-none markdown-content overflow-y-auto"
        :style="{ maxHeight: MAX_HEIGHT, maxWidth: MAX_HEIGHT }"
      ></div>
      <p 
        v-else 
        class="text-gray-500 italic"
        :style="{ maxHeight: MAX_HEIGHT, maxWidth: MAX_HEIGHT }"
      >
        No description provided.
      </p>
    </div>

    <!-- edit mode -->

    <div v-else>
      <textarea
        v-model="editedText"
        class="w-full min-h-[200px] p-3 rounded-md focus:outline-none focus:ring-0 bg-transparent border-0"
        placeholder="Enter description..."
        :maxlength="MAX_CHARACTERS"
      ></textarea>
      
      <div 
        class="text-xs text-right mb-2"
        :class="isOverLimit ? 'text-red-500' : 'text-gray-500'"
      >
        {{ charactersRemaining }} characters remaining
      </div>
      
      <div class="flex gap-2 justify-end">
        <button
          @click="cancelEdit"
          class="px-4 py-2 rounded-md hover:opacity-70 transition-opacity"
        >
          Cancel
        </button>
        <button
          @click="saveDescription"
          :disabled="isSaving || isOverLimit"
          class="px-4 py-2 rounded-md hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSaving ? 'Saving...' : 'Save' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  resize: vertical;
  font-family: inherit;
}

.markdown-content :deep(p) {
  margin-bottom: 1rem;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.markdown-content.overflowing::after {
  opacity: 1;
}
</style>
