<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Markdown from '~/utils/markdown';

const props = withDefaults(defineProps<{
    modelValue: string;
    canEdit?: boolean;
    loading?: boolean;
    maxCharacters?: number;
    renderDebounce?: number;
    maxHeight?: string;
    minHeight?: string;
    placeholder?: string;
    editPlaceholder?: string;
	loadingPlaceholder?: string;
    saveButtonText?: string;
    cancelButtonText?: string;
    sanitize?: boolean;
    onSave?: (value: string) => Promise<void>;
}>(), {
    maxCharacters: 2000,
    maxHeight: '400px',
    minHeight: '400px',
    saveButtonText: 'Save',
    cancelButtonText: 'Cancel',
    sanitize: true,
    renderDebounce: 300,
    placeholder: 'No content provided.',
    editPlaceholder: 'Enter content...',
	loadingPlaceholder: 'Loading...',
});

const emit = defineEmits<{
    'update:modelValue': [value: string];
    'save': [value: string];
}>();

const isEditing = ref(false);
const isSaving = ref(false);
const isRendering = ref(true);
const isDragging = ref(false);
const renderedMarkdownContent = ref('');

const savedText = ref(props.modelValue || '');
const editBuffer = ref(props.modelValue || '');
const hasUnsavedChanges = computed(() => !isEditing.value && editBuffer.value !== savedText.value);

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

const charactersRemaining = computed(() => props.maxCharacters - editBuffer.value.length);
const isOverLimit = computed(() => editBuffer.value.length > props.maxCharacters);
const isDisabled = computed(() => isSaving.value || props.loading);

watch(() => props.modelValue, async (newValue) => {
    if (isEditing.value) return;
    isRendering.value = true;
    renderedMarkdownContent.value = await Markdown.Render(newValue || '', props.sanitize);
    isRendering.value = false;
}, { immediate: true });

let debounceTimer: ReturnType<typeof setTimeout>;

watch(editBuffer, (newText) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
        renderedMarkdownContent.value = await Markdown.Render(newText || '', props.sanitize);
    }, props.renderDebounce);
});

const toggleMode = () => {
    isEditing.value = !isEditing.value;
};

const cancelEdit = () => {
    editBuffer.value = savedText.value;
    emit('update:modelValue', savedText.value);
    isEditing.value = false;
};

const handleSave = async () => {
    if (isDisabled.value || isOverLimit.value) return;
    isSaving.value = true;
    try {
        await props.onSave?.(editBuffer.value);
        savedText.value = editBuffer.value;
        emit('save', editBuffer.value);
        emit('update:modelValue', editBuffer.value);
        isEditing.value = false;
    } catch (error) {
        console.error('Failed to save:', error);
    } finally {
        isSaving.value = false;
    }
};

// toolbar helper functions

const wrapInline = (before: string, after: string, placeholder: string) => {
    const textarea = textareaRef.value;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = editBuffer.value.slice(start, end) || placeholder;
    const replacement = `${before}${selected}${after}`;

    editBuffer.value = editBuffer.value.slice(0, start) + replacement + editBuffer.value.slice(end);

    nextTick(() => {
        textarea.focus();
        const newStart = start + before.length;
        const newEnd = newStart + selected.length;
        textarea.setSelectionRange(newStart, newEnd);
    });
};

const prependLine = (prefix: string) => {
    const textarea = textareaRef.value;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = editBuffer.value.slice(0, start);
    const selected = editBuffer.value.slice(start, end);
    const after = editBuffer.value.slice(end);

    const lineStart = before.lastIndexOf('\n') + 1;
    const already_prefixed = editBuffer.value.slice(lineStart).startsWith(prefix);

    if (already_prefixed) {
        const removed = before.slice(0, lineStart) + before.slice(lineStart).replace(prefix, '') + selected.replace(new RegExp(`^${prefix}`, 'gm'), '') + after;
        editBuffer.value = removed;
    } else {
        const lines = selected ? selected.split('\n').map(l => `${prefix}${l}`).join('\n') : `${prefix}`;
        editBuffer.value = before + lines + after;
    }

    nextTick(() => textarea.focus());
};

const toolbarActions = [
    {
        label: 'H2',
        title: 'Heading 2',
        text: true,
        action: () => prependLine('## '),
    },
    {
        label: 'H3',
        title: 'Heading 3',
        text: true,
        action: () => prependLine('### '),
    },
    { divider: true },
    {
        icon: 'fa-solid fa-bold',
        title: 'Bold',
        action: () => wrapInline('**', '**', 'bold text'),
    },
    {
        icon: 'fa-solid fa-italic',
        title: 'Italic',
        action: () => wrapInline('*', '*', 'italic text'),
    },
    { divider: true },
    {
        icon: 'fa-solid fa-code',
        title: 'Inline code',
        action: () => wrapInline('`', '`', 'code'),
    },
    {
		icon: 'fa-solid fa-file-code',
		title: 'Code block',
		action: () => wrapInline('```\n', '\n```', 'code'),
	},
    { divider: true },
    {
        icon: 'fa-solid fa-quote-left',
        title: 'Blockquote',
        action: () => prependLine('> '),
    },
    {
        icon: 'fa-solid fa-link',
        title: 'Link',
        action: () => wrapInline('[', '](url)', 'link text'),
    },
    { divider: true },
    {
        icon: 'fa-solid fa-image',
        title: 'Upload image',
        action: () => fileInputRef.value?.click(),
    },
] as const;

const insertAt = (text: string, pos: number): number => {
    const textarea = textareaRef.value;
    if (!textarea) return pos;

    textarea.focus();
    textarea.setRangeText(text, pos, pos, 'end');
    textarea.dispatchEvent(new Event('input'));
    return textarea.selectionEnd;
};

const getDropPosition = (e: DragEvent): number => {
    const textarea = textareaRef.value;
    if (!textarea) return editBuffer.value.length;

    const rect = textarea.getBoundingClientRect();
    const { lineHeight, fontSize } = getComputedStyle(textarea);

    const y = e.clientY - rect.top + textarea.scrollTop;
    const x = e.clientX - rect.left;
    const line = Math.floor(y / parseFloat(lineHeight));
    const col = Math.floor(x / (parseFloat(fontSize) * 0.6));

    const lines = editBuffer.value.split('\n');
    let pos = lines.slice(0, line).reduce((acc, l) => acc + l.length + 1, 0);

    if (line < lines.length) {
        pos += Math.min(col, lines[line].length);
    }

    return Math.min(pos, editBuffer.value.length);
};

const uploadImage = async (file: File, position?: number) => {
    if (!file.type.startsWith('image/')) return;

    const pos = position ?? textareaRef.value?.selectionStart ?? editBuffer.value.length;
    const placeholder = `![Uploading ${file.name}...]()`;
    const endPos = insertAt(placeholder, pos);

    try {
        const { data: url, error } = await API.UploadToCatbox(file);
        if (error) throw new Error(error._request || 'Upload failed');

        const textarea = textareaRef.value;
        if (textarea && url) {
            textarea.setRangeText(`![${file.name}](${url})`, endPos - placeholder.length, endPos, 'end');
            textarea.dispatchEvent(new Event('input'));
        }
    } catch (error) {
        console.error('Upload failed:', error);
        const textarea = textareaRef.value;
        if (textarea) {
            textarea.setRangeText('Failed to upload image!', endPos - placeholder.length, endPos, 'end');
            textarea.dispatchEvent(new Event('input'));
        }
    }
};

const handleFileInput = async (e: Event) => {
    const files = Array.from((e.target as HTMLInputElement).files || []);
    for (const file of files) {
        await uploadImage(file);
    }
    if (fileInputRef.value) fileInputRef.value.value = '';
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
    const items = Array.from(e.clipboardData?.items || []);
    const imageItem = items.find(item => item.type.startsWith('image/'));

    if (imageItem) {
        e.preventDefault();
        const file = imageItem.getAsFile();
        if (file) await uploadImage(file);
    }
};
</script>

<template>
    <div class="relative">
        <div v-if="canEdit" class="absolute top-0 right-0 z-10 p-4">
            <button
                @click="toggleMode"
                :disabled="isDisabled"
                class="relative hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                :title="hasUnsavedChanges ? 'Edit (Unsaved changes)' : isEditing ? 'Preview' : 'Edit'"
            >
                <i :class="isEditing ? 'fa-solid fa-book' : 'fa-solid fa-pen'" class="text-sm" />
                <span
                    v-if="hasUnsavedChanges"
                    class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow"
                />
            </button>
        </div>

        <div class="p-4" :class="{ 'pr-12': canEdit }">

            <!-- View mode -->
			<div v-if="!isEditing" class="overflow-hidden w-full">
				<p v-if="isRendering || loading" class="text-sm italic text-gray-500">{{ loadingPlaceholder }}</p>
				<div
					v-else-if="modelValue"
					v-html="renderedMarkdownContent"
					class="max-w-none markdown-content overflow-y-auto overflow-x-hidden"
					:style="{ maxHeight }"
				/>
				<p v-else class="text-sm italic text-gray-500">{{ placeholder }}</p>
			</div>

            <!-- Edit mode -->
            <div
                v-else
                class="w-full"
                @dragenter.prevent="isDragging = !!$event.dataTransfer?.types.includes('Files')"
                @dragover.prevent
                @dragleave.prevent="isDragging = false"
                @drop="handleDrop"
            >
                <!-- Toolbar -->
                <div class="flex items-center gap-1 mb-2 flex-wrap">
                    <template v-for="(item, i) in toolbarActions" :key="i">
                        <div v-if="'divider' in item" class="w-px h-4 bg-dark-5 mx-1" />
                        <button
                            v-else
                            @click="item.action"
                            :title="item.title"
                            class="w-7 h-7 flex items-center justify-center rounded hover:bg-dark-5 transition-colors text-gray-400 hover:text-white"
                        >
                            <i v-if="'icon' in item" :class="item.icon" class="text-xs" />
                            <span v-else class="text-xs font-bold">{{ item.label }}</span>
                        </button>
                    </template>
                </div>

                <textarea
                    ref="textareaRef"
                    v-model="editBuffer"
                    class="w-full p-3 rounded-md focus:outline-none focus:ring-0 bg-transparent border transition-all duration-0 focus:border-highlight"
                    :class="isDragging ? 'border-highlight' : 'border-dark-5'"
                    :style="{
                        minHeight,
                        borderColor: isDragging ? '#8585e0' : undefined,
                        boxShadow: isDragging ? '0 0 0 3px rgba(133, 133, 224, 0.1)' : undefined,
                    }"
                    :placeholder="editPlaceholder"
                    :maxlength="maxCharacters"
                    @paste="handlePaste"
                />

                <input
                    ref="fileInputRef"
                    type="file"
                    accept="image/*"
                    multiple
                    class="hidden"
                    @change="handleFileInput"
                />

                <div
                    class="text-xs text-right mb-2"
                    :class="isOverLimit ? 'text-red-500' : 'text-gray-500'"
                >
                    {{ charactersRemaining }} characters remaining
                </div>

                <div class="flex gap-2 justify-end">
                    <button
                        @click="cancelEdit"
                        :disabled="isDisabled"
                        class="px-4 py-2 rounded-md hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {{ cancelButtonText }}
                    </button>
                    <button
                        @click="handleSave"
                        :disabled="isDisabled || isOverLimit"
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

.markdown-content :deep(p) { margin-bottom: 1rem; }

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3) {
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
}

.markdown-content :deep(img) { max-width: 100%; height: auto; }
.markdown-content :deep(pre) { overflow-x: auto; max-width: 100%; }
.markdown-content :deep(code) { word-break: break-word; }
</style>