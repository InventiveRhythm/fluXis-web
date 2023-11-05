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
    }
});
</script>

<template>
    <div class="nav-link">
        <RouterLink :to="to">
            <i :class="'fa fa-' + icon"></i>
            {{ text }}
        </RouterLink>
        <div class="dropdown" v-if="dropdown && dropdown.length > 0">
            <div class="dropdown-list" >
                <RouterLink v-for="link in dropdown" :key="link.to" :to="link.to">{{ link.text }}</RouterLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.nav-link {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    margin: 5px 10px;
    transition: background-color .3s;
    border-radius: calc(var(--border) / 2); 
    position: relative;

    i {
        margin-right: 5px;
    }

    @media screen and (max-width: 700px) {
        display: none;
    }
}

.nav-link:hover {
    background-color: var(--bg-hover);
}

.dropdown {
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
    // width: 200px;
    min-height: 80px;
    padding: 70px 20px 20px 20px;
    visibility: hidden;
    background-color: var(--bg-secondary);
    z-index: -10;
    border-radius: 0 0 20px 20px;
    backdrop-filter: var(--blur-10);
    transition: all .3s cubic-bezier(0.22, 1, 0.36, 1);
    opacity: 0;

    .dropdown-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;

        a {
            padding: 5px 10px;
            margin: 1px 0;
            border-radius: calc(var(--border) / 2); 
            text-align: center;
            white-space: nowrap;
        }

        a:hover {
            background-color: var(--bg-quaternary);
        }
    }
}

.nav-link:hover .dropdown {
    visibility: visible;
    opacity: 1;
    top: -30px;
}
</style>