<template>
  <div class="relative w-full h-full">
    <router-view v-slot="{ Component, route }">
      <transition @enter="onEnter" @leave="onLeave" :css="false" appear>
        <component class="absolute" :is="Component" :key="route.name" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';

function onEnter(el: HTMLElement, done: () => void) {
  gsap.fromTo(
    el,
    { opacity: 0, translateX: '-5%', scale: 0.95 },
    {
      opacity: 1,
      translateX: '0%',
      scale: 1,
      duration: 0.5,
      ease: 'power3.inOut',
      onComplete: done
    }
  );
}

function onLeave(el: HTMLElement, done: () => void) {
  gsap.to(el, {
    opacity: 0,
    translateX: '5%',
    duration: 0.5,
    ease: 'power3.inOut',
    onComplete: done
  });
}
</script>

<style scoped></style>
