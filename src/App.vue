<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/nav/NavBar.vue";
import Footer from "./components/footer/Footer.vue";
import Loading from "./components/loading/Loading.vue";
import UserOverlay from "./overlays/user/UserOverlay.vue";
import { Transition, Suspense } from "vue";
</script>

<template>
    <div class="mx-auto grid w-full grid-cols-1 grid-rows-1 pb-32 pt-20 md:pt-28 text-center xl:w-content">
        <RouterView v-slot="{ Component, route }">
            <Transition name="fade">
                <div :key="route.path" class="row-1 col-1">
                    <Suspense>
                        <component :is="Component" />
                    </Suspense>
                </div>
            </Transition>
        </RouterView>
    </div>

    <Footer></Footer>

    <div class="fixed top-0 left-0 w-screen h-screen pointer-events-none z-40">
        <UserOverlay />
        <Loading />
    </div>

    <NavBar />
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: all 0.4s ease;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
