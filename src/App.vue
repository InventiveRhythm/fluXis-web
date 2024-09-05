<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/nav/NavBar.vue";
import Footer from "./components/footer/Footer.vue";
import Loading from "./components/loading/Loading.vue";
import UserOverlay from "./overlays/user/UserOverlay.vue";
import CreateClubOverlay from "./overlays/club-creation/CreateClubOverlay.vue";
import EditClubOverlay from "./overlays/club-edit/EditClubOverlay.vue";

function stringifyRoute(route) {
    if (!route.name)
        return route.path;

    var result = route.name.split(":")[0];

    for (const [key, value] of Object.entries(route.params)) {
        result += `/${key}:${value}`;
    }

    return result;
}
</script>

<template>
    <div class="mx-auto grid w-full grid-cols-1 grid-rows-1 pb-32 pt-20 md:pt-28 text-center xl:w-content">
        <RouterView v-slot="{ Component, route }">
            <Transition name="fade">
                <div :key="stringifyRoute(route)" class="row-1 col-1">
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
        <CreateClubOverlay />
        <EditClubOverlay />
        <Loading />
    </div>

    <NavBar />
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: 0ms;
    transform-origin: top center;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.fade-enter-to {
    transition-delay: 100ms;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(.98)
}
</style>
