<template>
    <div class="h-screen w-screen">
        <div class="mx-auto grid w-full pb-32 pt-20 text-center *:relative *:z-0 *:col-1 *:row-1 xl:w-content xl:pt-28">
            <slot></slot>
        </div>

        <div class="pointer-events-none fixed left-0 top-0 z-40 h-screen w-screen">
            <UserOverlay />
        </div>

        <NavigationBar />
    </div>
</template>
