<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Markdown from '~/utils/markdown';

const props = defineProps<{
  modelValue: string;
  canEdit?: boolean;
  maxCharacters?: number;
  maxHeight?: string;
  placeholder?: string;
  minHeight?: string;
  saveButtonText?: string;
  cancelButtonText?: string;
  sanitize?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'save': [value: string];
}>();

const MAX_CHARACTERS = props.maxCharacters ?? 2000;
const MAX_HEIGHT = props.maxHeight ?? '400px';
const MIN_HEIGHT = props.minHeight ?? '200px';
const SAVE_TEXT = props.saveButtonText ?? 'Save';
const CANCEL_TEXT = props.cancelButtonText ?? 'Cancel';
const SANITIZE = props.sanitize ?? true;

const isEditing = ref(false);
const isSaving = ref(false);
const isRendering = ref(true);
const editedText = ref('');
const renderedMarkdownContent = ref('');

watch(() => props.modelValue, async (newValue) => {
  if (!isEditing.value) {
    isRendering.value = true;
    const content = newValue || '';
    renderedMarkdownContent.value = await Markdown.Render(content, SANITIZE);
    isRendering.value = false;
  }
}, { immediate: true });

watch(editedText, async (newText) => {
  if (newText) {
    renderedMarkdownContent.value = await Markdown.Render(newText, SANITIZE);
  }
});

const charactersRemaining = computed(() => {
  return MAX_CHARACTERS - editedText.value.length;
});

const isOverLimit = computed(() => {
  return editedText.value.length > MAX_CHARACTERS;
});

const toggleMode = () => {
  if (isEditing.value) {
    emit('update:modelValue', editedText.value);
    isEditing.value = false;
  } else {
    if (!editedText.value) {
      editedText.value = props.modelValue || '';
    }
    isEditing.value = true;
  }
};

const cancelEdit = () => {
  isEditing.value = false;
  editedText.value = '';
};

const handleSave = async () => {
  if (isSaving.value || isOverLimit.value) return;
  
  try {
    isSaving.value = true;
    emit('save', editedText.value);
    emit('update:modelValue', editedText.value);
    isEditing.value = false;
  } catch (error) {
    console.error('Failed to save:', error);
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <div class="relative">
    <div v-if="canEdit" class="absolute top-0 right-0 z-10 p-4">
      <button
        @click="toggleMode"
        class="hover:opacity-70 transition-opacity"
        :title="isEditing ? 'Preview' : 'Edit'"
      >
        <i :class="isEditing ? 'fa-solid fa-book' : 'fa-solid fa-pen'" class="text-sm"></i>
      </button>
    </div>

    <div class="p-4" :class="{ 'pr-12': canEdit }">
      
      <!-- view mode -->

      <div v-if="!isEditing" class="overflow-hidden w-full">
        <div v-if="isRendering">
          <LoadingIndicator />
        </div>
        <div 
          v-else-if="modelValue" 
          v-html="renderedMarkdownContent" 
          class="max-w-none markdown-content overflow-y-auto overflow-x-hidden"
          :style="{ maxHeight: MAX_HEIGHT }"
        ></div>
        <p 
          v-else 
          class="text-gray-500 italic"
          :style="{ maxHeight: MAX_HEIGHT }"
        >
          {{ placeholder || 'No content provided.' }}
        </p>
      </div>

      <!-- edit mode -->

      <div v-else class="w-full">
        <textarea
          v-model="editedText"
          class="w-full p-3 rounded-md focus:outline-none focus:ring-0 bg-transparent border-0"
          :style="{ minHeight: MIN_HEIGHT }"
          :placeholder="placeholder || 'Enter content...'"
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
            {{ CANCEL_TEXT }}
          </button>
          <button
            @click="handleSave"
            :disabled="isSaving || isOverLimit"
            class="px-4 py-2 rounded-md hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSaving ? 'Saving...' : SAVE_TEXT }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  resize: vertical;
  font-family: inherit;
}

.markdown-content {
  word-break: break-word;
  overflow-wrap: break-word;
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

.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
}

.markdown-content :deep(pre) {
  overflow-x: auto;
  max-width: 100%;
}

.markdown-content :deep(code) {
  word-break: break-word;
}
</style>