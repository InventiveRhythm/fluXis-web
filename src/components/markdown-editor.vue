<script setup lang="ts">
import Markdown from '~/utils/markdown';

const props = withDefaults(defineProps<{
  modelValue: string;
  canEdit?: boolean;
  maxCharacters?: number;
  maxHeight?: string;
  minHeight?: string;
  placeholder?: string;
  saveButtonText?: string;
  cancelButtonText?: string;
  sanitize?: boolean;
}>(), {
  maxCharacters: 2000,
  maxHeight: '400px',
  minHeight: '400px',
  saveButtonText: 'Save',
  cancelButtonText: 'Cancel',
  sanitize: true,
  placeholder: 'No content provided.'
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'save': [value: string];
}>();

const isEditing = ref(false);
const isSaving = ref(false);
const isRendering = ref(true);
const isDragging = ref(false);
const editedText = ref('');
const renderedMarkdownContent = ref('');

const textareaRef = ref<HTMLTextAreaElement | null>(null);

const originalText = props.modelValue;

const charactersRemaining = computed(() => props.maxCharacters - editedText.value.length);
const isOverLimit = computed(() => editedText.value.length > props.maxCharacters);

watch(() => props.modelValue, async (newValue) => {
  if (!isEditing.value) {
    isRendering.value = true;
    renderedMarkdownContent.value = await Markdown.Render(newValue || '', props.sanitize);
    isRendering.value = false;
  }
}, { immediate: true });

watch(editedText, async (newText) => {
  if (newText) {
    renderedMarkdownContent.value = await Markdown.Render(newText, props.sanitize);
  }
});

const toggleMode = () => {
  if (isEditing.value) {
    emit('update:modelValue', editedText.value);
    isEditing.value = false;
  } else {
    editedText.value = props.modelValue || '';
    isEditing.value = true;
  }
};

const cancelEdit = () => {
  isEditing.value = false;
  editedText.value = originalText;
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

const insertAt = (text: string, pos: number) => {
  const textarea = textareaRef.value;
  if (!textarea) return pos;

  textarea.focus();
  textarea.setRangeText(text, pos, pos, 'end');
  textarea.dispatchEvent(new Event('input'));
  return textarea.selectionEnd;
};

const getDropPosition = (e: DragEvent): number => {
  const textarea = textareaRef.value;
  if (!textarea) return editedText.value.length;

  const rect = textarea.getBoundingClientRect();
  const { lineHeight, fontSize } = getComputedStyle(textarea);
  
  const y = e.clientY - rect.top + textarea.scrollTop;
  const x = e.clientX - rect.left;
  const line = Math.floor(y / parseFloat(lineHeight));
  const col = Math.floor(x / (parseFloat(fontSize) * 0.6));
  
  const lines = editedText.value.split('\n');
  let pos = lines.slice(0, line).reduce((acc, l) => acc + l.length + 1, 0);
  
  if (line < lines.length) {
    pos += Math.min(col, lines[line].length);
  }
  
  return Math.min(pos - 1, editedText.value.length);
};

const uploadImage = async (file: File, position?: number) => {
  if (!file.type.startsWith('image/')) return;

  const pos = position ?? textareaRef.value?.selectionStart ?? editedText.value.length;
  const placeholder = `![Uploading ${file.name}...]()`;
  const endPos = insertAt(placeholder, pos);

  try {
    const { data: url, error } = await API.UploadToCatbox(file);
    
    if (error) {
      throw new Error(error._request || 'Upload failed');
    }

    const textarea = textareaRef.value;
    if (textarea && url) {
      const startPos = endPos - placeholder.length;
      textarea.setRangeText(`![${file.name}](${url})`, startPos, endPos, 'end');
      textarea.dispatchEvent(new Event('input'));
    }
  } catch (error) {
    console.error('Upload failed:', error);
    const textarea = textareaRef.value;
    if (textarea) {
      const startPos = endPos - placeholder.length;
      textarea.setRangeText(`Failed to upload Image!`, startPos, endPos, 'end');
      textarea.dispatchEvent(new Event('input'));
    }
  }
};

const handleDrop = async (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = false;
  
  if (!isEditing.value) return;

  const files = Array.from(e.dataTransfer?.files || []);
  if (!files.length) return;

  textareaRef.value?.focus();
  let pos = getDropPosition(e);
  
  for (const file of files) {
    await uploadImage(file, pos);
    pos = textareaRef.value?.selectionEnd ?? pos;
  }
};

const handlePaste = async (e: ClipboardEvent) => {
  const list = Array.from(e.clipboardData?.items || []);
  const image = list.find(item => item.type.startsWith('image/'));
  
  if (image) {
    e.preventDefault();
    const file = image.getAsFile();
    if (file) await uploadImage(file);
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
        <i :class="isEditing ? 'fa-solid fa-book' : 'fa-solid fa-pen'" class="text-sm" />
      </button>
    </div>

    <div class="p-4" :class="{ 'pr-12': canEdit }">
      
      <!-- view mode -->

      <div v-if="!isEditing" class="overflow-hidden w-full">

        <LoadingIndicator v-if="isRendering" />

        <div 
          v-else-if="modelValue" 
          v-html="renderedMarkdownContent" 
          class="max-w-none markdown-content overflow-y-auto overflow-x-hidden"
          :style="{ maxHeight }"
        ></div>
        <p v-else class="text-gray-500 italic" :style="{ maxHeight }">
          {{ placeholder }}
        </p>
      </div>

      <!-- edit mode -->
       
      <div 
        v-else 
        class="w-full"
        @dragenter.prevent="isDragging = !!$event.dataTransfer?.types.includes('Files')"
        @dragover.prevent
        @dragleave.prevent="isDragging = false"
        @drop="handleDrop"
      >
        <textarea
          ref="textareaRef"
          v-model="editedText"
          class="w-full p-3 rounded-md focus:outline-none focus:ring-0 bg-transparent border transition-all duration-100"
          :class="isDragging ? 'border-highlight' : 'border-dark-5'"
          :style="{ 
            minHeight,
            borderColor: isDragging ? '#8585e0' : undefined,
            boxShadow: isDragging ? '0 0 0 3px rgba(133, 133, 224, 0.1)' : undefined
          }"
          :placeholder="placeholder || 'Enter content...'"
          :maxlength="maxCharacters"
          @paste="handlePaste"
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
            {{ cancelButtonText }}
          </button>
          <button
            @click="handleSave"
            :disabled="isSaving || isOverLimit"
            class="px-4 py-2 rounded-md hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSaving ? 'Saving...' : saveButtonText }}
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