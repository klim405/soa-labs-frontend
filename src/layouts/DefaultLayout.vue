<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue'
</script>

<template>
  <MainHeader/>
  <main class="default-layout">
    <div class="default-layout__content">
      <slot/>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/general/consts' as consts;

.default-layout {
  display: flex;
  padding: consts.$main-header-height consts.$page-content-padding 0;
  width: 100%;
  justify-content: center;

  &__content {
    display: flex;
    flex-direction: column;
    row-gap: consts.$vertical-elem-spacing;
    width: 100%;
    max-width: consts.$page-max-content-width;
  }
}
</style>
