<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { useMusicBandStore } from '@/stores/music_bands';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { number, object, string } from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import TextInput from '@/components/ui/inputs/TextInput.vue';
import SelectInput from '@/components/ui/inputs/SelectInput.vue';
import { ButtonFormStyle, ElemColor, InputStatus } from '@/utils/style/style';
import SimpleButton from '@/components/ui/buttons/SimpleButton.vue';
import { MusicGenre } from '@/utils/schemas/musicGenre';

const router = useRouter();
const musicBandStore = useMusicBandStore();

const { defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(object({
    name: string().required().max(255),
    numberOfParticipants: number().min(1),
    description: string().max(255),
    genre: string().required(),
    x: number().required().min(-513),
    y: number().integer().required(),
    label: string().max(255).required()
  }))
})

const [name, nameProps] = defineField('name', {
  props: state => ({
    labelText: "Назвагние",
    helpText: state.errors.join('; '),
    status: state.touched ? (state.valid ? InputStatus.SUCCESS : InputStatus.ERROR) : InputStatus.NEUTRAL,
  })
});
const [numberOfParticipants, numberOfParticipantsProps] = defineField('numberOfParticipants', {
  props: state => ({
    labelText: "Количество учасников",
    helpText: state.errors.join('; '),
    status: state.touched ? (state.valid ? InputStatus.SUCCESS : InputStatus.ERROR) : InputStatus.NEUTRAL,
  })
});
const [description, descriptionProps] = defineField('description', {
  props: state => ({
    labelText: "Описание",
    helpText: state.errors.join('; '),
    status: state.touched ? (state.valid ? InputStatus.SUCCESS : InputStatus.ERROR) : InputStatus.NEUTRAL,
  })
});
const [genre, genreProps] = defineField('genre', {
  props: state => ({
    labelText: "Жанр",
    helpText: state.errors.join('; '),
    status: state.touched ? (state.valid ? InputStatus.SUCCESS : InputStatus.ERROR) : InputStatus.NEUTRAL,
    options: [MusicGenre.POST_ROCK, MusicGenre.PUNK_ROCK, MusicGenre.RAP, MusicGenre.ROCK]
  })
});
const [x, xProps] = defineField('x', {
  props: state => ({
    labelText: "Координата x",
    helpText: state.errors.join('; '),
    status: state.touched ? (state.valid ? InputStatus.SUCCESS : InputStatus.ERROR) : InputStatus.NEUTRAL,
  })
});
const [y, yProps] = defineField('y', {
  props: state => ({
    labelText: "Координата y",
    helpText: state.errors.join('; '),
    status: state.touched ? (state.valid ? InputStatus.SUCCESS : InputStatus.ERROR) : InputStatus.NEUTRAL,
  })
});
const [label, labelProps] = defineField('label', {
  props: state => ({
    labelText: "Лэйбл",
    helpText: state.errors.join('; '),
    status: state.touched ? (state.valid ? InputStatus.SUCCESS : InputStatus.ERROR) : InputStatus.NEUTRAL,
  })
});

const onSubmit = handleSubmit(async (values) => {
  await musicBandStore.addMusicBand(values);
  router.push({name: "music-bands"});
})
</script>

<template>
  <DefaultLayout>
    <form @submit="onSubmit">
      <TextInput v-model="name" v-bind="nameProps" />
      <TextInput v-model="numberOfParticipants" v-bind="numberOfParticipantsProps" />
      <TextInput v-model="description" v-bind="descriptionProps" />
      <SelectInput v-model="genre" v-bind="genreProps"/>
      <TextInput v-model="x" v-bind="xProps" />
      <TextInput v-model="y" v-bind="yProps" />
      <TextInput v-model="label" v-bind="labelProps" />
      <SimpleButton :elem-color="ElemColor.PRIMARY" :form-style="ButtonFormStyle.OUTLINE" type="submit">Сохранить</SimpleButton>
    </form>
  </DefaultLayout>
</template>

<style scoped lang="scss"></style>
