<script setup lang="ts">
import MusicBandList from '@/components/MusicBandList.vue';
import MusicBandItem from '@/components/MusicBandItem.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { useMusicBandStore } from '@/stores/music_bands';
import TextInput from '@/components/ui/inputs/TextInput.vue';
import { ref } from 'vue';
import SelectInput from '@/components/ui/inputs/SelectInput.vue';
import type { MusicBand } from '@/utils/schemas/musicBand';

const musicBandStore = useMusicBandStore();
musicBandStore.$reset();

const name = ref("");
const orderBy = ref("id")
</script>

<template>
  <DefaultLayout>
    <TextInput placeholder="Введите название" v-model="name" label-text="Поиск" />
    <SelectInput label-text="Сортировка" v-model="orderBy" :options="['id', 'name', 'creationDate', 'label', 'numberOfParticipants']" />
    <MusicBandList>
      <MusicBandItem v-for="musicBand in musicBandStore.filterMusicBandByName(name, orderBy as keyof MusicBand)" :value="musicBand" :key="musicBand.id" />
    </MusicBandList>
  </DefaultLayout>
</template>

<style scoped lang="scss"></style>
