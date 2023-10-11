<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/nav/NavBar.vue';
import Footer from './components/footer/Footer.vue';
import Loading from './components/loading/Loading.vue';
import UserOverlay from './overlays/user/UserOverlay.vue';
import SearchOverlay from './overlays/search/SearchOverlay.vue';
import { Transition, Suspense } from 'vue';
</script>

<template>
  <NavBar />

  <div class="content">
    <RouterView v-slot="{ Component, route }">
      <Transition :name=route.meta.transition>
        <div :key="route.path" class="router-page">
          <Suspense>
            <component :is="Component" />
          </Suspense>
        </div>
      </Transition>
    </RouterView>
  </div>

  <Footer></Footer >

  <div class="overlays">
    <UserOverlay />
    <SearchOverlay />
    <Loading />
  </div>
</template>

<style lang="scss">
  .content {
    width: 1320px;
    max-width: calc(100vw - 40px);
    margin: 100px auto 30px auto;
    text-align: center;
    height: min-content;
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .content .router-page {
    width: 100%;
    max-width: 1320px;
    height: min-content;
    grid-row: 1;
    grid-column: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .overlays {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 150;
  }

  /* transition shid */

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: all 0.4s ease;
  }

  .slide-right-enter-to,
  .slide-left-enter-to,
  .slide-right-leave-from,
  .slide-left-leave-from {
    opacity: 1;
  }

  .slide-right-enter-from,
  .slide-left-leave-to {
    opacity: 0;
  }

  .slide-left-enter-from,
  .slide-right-leave-to {
    opacity: 0;
  }
</style>