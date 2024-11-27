<script setup lang="ts">
import { ButtonFormStyle, ElemColor } from '@/utils/style/style'

withDefaults(
  defineProps<{
    to: string,
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
  <RouterLink :to="to" class="btn" :class="`${formStyle} ${elemColor}`">
    <slot />
  </RouterLink>
</template>

<style scoped lang="scss">
@use '@/assets/components/ui/buttons' as *;
</style>
