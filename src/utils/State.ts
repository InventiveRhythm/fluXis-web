import { reactive } from 'vue';

import type APIUser from '@/api/models/users/APIUser';
import Cookies from '@/utils/Cookies';

export const state = reactive<{
    user?: APIUser
}>({
    user: Cookies.Get('user')
});
