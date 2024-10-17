<script setup lang="ts">
import { computed } from 'vue'
import { InputStatus } from '@/utils/style/style'

const props = withDefaults(
  defineProps<{
    labelText: string
    modelValue: string
    helpText?: string
    status?: InputStatus
  }>(),
  {
    helpText: '',
    status: InputStatus.NEUTRAL,
  }
)

const emits = defineEmits([
  'update:modelValue'
])

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    emits('update:modelValue', value)
  }
})
</script>

<template>
  <div class="text-input">
    <label class="text-input__label">
      <span class="text-input__label__wrapper">{{ labelText }}</span>
      <input class="text-input__input" :class="status" v-model="inputValue" type="text" v-bind="$attrs">
    </label>
    <p v-if="helpText" class="text-input__help-text" :class="status">{{ helpText }}</p>
  </div>
</template>

<style scoped lang="scss">
  @use '@/assets/general/fonts' as fonts;
  @use '@/assets/general/colors' as colors;
  @use '@/assets/general/consts' as consts;

  $row-gap: 6px;
  $shift: calc( consts.$border-radius * 0.8 );

  .text-input {
    display: flex;
    flex-direction: column;
    margin-top: consts.$vertical-elem-spacing;
    row-gap: calc($row-gap / 2);
    width: 100%;
    color: colors.$base-02;

    &__label {
      display: block;

      &__wrapper {
        @include fonts.font-style();

        color: colors.$base-02;
        padding-left: $shift;
      }
    }

    &__input {
      @include fonts.font-style($line-height: consts.$ui-line-height);

      display: block;
      width: 100%;
      padding: consts.$ui-tb-padding $shift;
      margin-top: $row-gap;
      border: 1px solid colors.$base-05;
      border-radius: consts.$border-radius;
      color: inherit;

      &::placeholder {
        color: colors.$base-08;
      }

      &.success {
        color: colors.$green-7;
        border-color: colors.$green-5;

        &::placeholder {
          color: colors.$green-2;
        }
      }

      &.warning {
        color: colors.$yellow-7;
        border-color: colors.$yellow-5;

        &::placeholder {
          color: colors.$yellow-2;
        }
      }

      &.error {
        color: colors.$red-7;
        border-color: colors.$red-5;

        &::placeholder {
          color: colors.$red-2;
        }
      }
    }

    &__help-text {
      @include fonts.font-style(14px);

      padding-left: $shift;
      color: inherit;

      &.success {
        color: colors.$green-7;
      }

      &.warning {
        color: colors.$yellow-7;
      }

      &.error {
        color: colors.$red-7;
      }
    }
  }
</style>
