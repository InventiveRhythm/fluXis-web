<script setup>
const props = defineProps({
    to: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    dropdown: {
        type: Array,
        default: () => []
    },
    showDropdown: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <div class="hidden lg:flex flex-col items-start px-3 py-1 mx-2 rounded-md transition-colors !bg-opacity-20 hover:bg-white">
        <RouterLink :to="to" class="flex gap-2 items-center">
            <i :class="'fa fa-' + icon"></i>
            {{ text }}
        </RouterLink>
        <div class="absolute mt-7 pt-9 group" v-if="dropdown && dropdown.length > 0 && showDropdown">
            <div class="flex flex-col justify-start items-start gap-1">
                <RouterLink class="text-sm w-full hover:!opacity-100 group-has-[:hover]:opacity-60" v-for="link in dropdown" :key="link.to" :to="link.to">{{ link.text }}</RouterLink>
            </div>
        </div>  
    </div>
</template>