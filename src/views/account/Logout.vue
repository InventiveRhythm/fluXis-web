<script setup>
import Cookies from '@/utils/Cookies';

Cookies.Remove('user');
Cookies.Remove('token');
location = '/';
</script>