<script setup lang="ts">
import { ButtonFormStyle, ElemColor } from '@/utils/style/style'

withDefaults(
  defineProps<{
    formStyle?: ButtonFormStyle,
    elemColor?: ElemColor
  }>(),
  {
    formStyle: ButtonFormStyle.FILLED,
    elemColor: ElemColor.SECONDARY,
  }
)
</script>

<template>
  <button class="btn" :class="`${formStyle} ${elemColor}`">
    <slot />
  </button>
</template>

<style scoped lang="scss">
@use '@/assets/components/ui/buttons' as *;
</style>
