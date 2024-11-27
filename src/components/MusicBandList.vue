<script setup lang="ts"></script>

<template>
  <ul class="music-band-list">
    <slot/>
  </ul>
</template>

<style lang="scss" scoped>
@use '@/assets/general/consts' as consts;

.music-band-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
  padding: consts.$vertical-elem-spacing 0 0;
  row-gap: consts.$vertical-elem-spacing;
}
</style>
