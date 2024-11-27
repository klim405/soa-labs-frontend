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
  <a class="btn" :class="`${formStyle} ${elemColor}`">
    <slot />
  </a>
</template>

<style scoped lang="scss">
@use '@/assets/components/ui/buttons' as *;
</style>
