<script setup lang="ts">
import type { MusicBand } from '@/utils/schemas/musicBand'
import SimpleButton from '@/components/ui/buttons/SimpleButton.vue';
import TrashCanIcon from '@/assets/svg/trash-can-icon.svg';
import PenToSquareIcon from '@/assets/svg/pen-to-square-icon.svg';
import { ElemColor } from '@/utils/style/style';
import { useMusicBandStore } from '@/stores/music_bands';
import RouterLinkButton from './ui/buttons/RouterLinkButton.vue';

defineProps<{
  value: MusicBand
}>()

const musicBandStore = useMusicBandStore();

</script>

<template>
  <li class="music-band">
    <div class="music-band__header">
      <h2 class="music-band__header__name">{{ value.name }}</h2>
      <div class="music-band__header__shortcuts">
        <RouterLinkButton :to="`/music-bands/${value.id}`" class="shortcut-btn" :elemColor="ElemColor.WARNING">
          <PenToSquareIcon class="shortcut-btn__icon" />
        </RouterLinkButton>
        <SimpleButton class="shortcut-btn" :elemColor="ElemColor.DANGER" @click="() => {musicBandStore.deleteMusicBand(value.id)}">
          <TrashCanIcon class="shortcut-btn__icon" />
        </SimpleButton>
      </div>
    </div>
    <div class="music-band__content">
      <p class="music-band__content__line" v-if="value.description">{{ value.description }}</p>
      <p class="music-band__content__line">Жанр: {{ value.genre }}</p>
      <p class="music-band__content__line" v-if="value.numberOfParticipants">Количество учасников: {{ value.numberOfParticipants }}</p>
      <p class="music-band__content__line" v-if="value.label">Лейбл: {{ value.label.name }}</p>
    </div>
    <div class="music-band__footer">
      <p class="music-band__footer__coordinates">Координаты x:{{ value.coordinates.x }} y:{{ value.coordinates.y }}</p>
      <p class="music-band__footer__creation-date">{{ value.creationDate.toISOString() }}</p>
    </div>
  </li>
</template>

<style lang="scss" scoped>
@use '@/assets/general/colors' as colors;
@use '@/assets/general/consts' as consts;
@use '@/assets/general/fonts' as fonts;

.music-band {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: consts.$border-radius;
  background-color: colors.$base-12;
  border-radius: consts.$border-radius;

  &__header {
    display: flex;
    padding-bottom: consts.$border-radius;
    justify-content: space-between;
    align-items: center;

    &__name {
      @include fonts.font-style(18px, 600);

      color: colors.$base-03;
    }

    &__shortcuts {
      display: flex;
      column-gap: 10px;

      .shortcut-btn {
        display: flex;
        justify-content: center;
        align-items: center;

        &__icon {
          height: 16px;
        }
      }
      
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 8px;

    &__line {
      @include fonts.font-style();

      display: flex;
      color: colors.$base-03;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    padding-top: consts.$border-radius;

    &__coordinates,
    &__creation-date {
      display: flex;
      color: colors.$base-06;
    }
  }
}
</style>
