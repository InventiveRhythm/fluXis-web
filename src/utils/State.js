import { reactive } from 'vue';

export const state = reactive({
    user: $cookies.get('user') || null
});
