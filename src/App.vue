<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/nav/NavBar.vue';
import Footer from './components/footer/Footer.vue';
import Loading from './components/loading/Loading.vue';
import UserOverlay from './overlays/user/UserOverlay.vue';
import { Transition, Suspense } from 'vue';
</script>

<template>
  <Suspense>
    <div class="content">
      <RouterView v-slot="{ Component, route }">
        <Transition :name=route.meta.transition>
          <div :key="route.path" class="router-page">
            <component :is="Component" />
          </div>
        </Transition>
      </RouterView>
    </div>
  </Suspense>

  <Footer></Footer >

  <div class="overlays">
    <UserOverlay />
    <Loading />
  </div>

  <NavBar />
</template>

<style lang="scss">
  .content {
    width: 1320px;
    max-width: calc(100vw - 40px);
    padding: 100px 0 120px 0;
    margin: 0 auto 0 auto;
    text-align: center;
    height: min-content;
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .content .router-page {
    width: inherit;
    max-width: inherit;
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
    z-index: 50;
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