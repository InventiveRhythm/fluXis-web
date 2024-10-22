<script setup lang="ts">
import type APIUser from '@/api/models/users/APIUser';

import LoadingImage from '../LoadingImage.vue';

import Assets from '@/utils/Assets';
import { NameWithApostrophe } from '@/utils/Formatting';

defineProps<{
    user: APIUser
}>();
</script>

<template>
    <LoadingImage :src="Assets.Banner(user)" :alt="`${NameWithApostrophe(user.username)} banner`" />
</template>