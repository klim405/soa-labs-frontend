<script setup lang="ts">
import MusicBandList from '@/components/MusicBandList.vue';
import MusicBandItem from '@/components/MusicBandItem.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { useMusicBandStore } from '@/stores/music_bands';

const musicBandStore = useMusicBandStore();
musicBandStore.$reset();
</script>

<template>
  <DefaultLayout>
      <MusicBandList>
        <MusicBandItem v-for="musicBand in musicBandStore.musicBandList" :value="musicBand" :key="musicBand.id" />
      </MusicBandList>
  </DefaultLayout>
</template>

<style scoped lang="scss"></style>
