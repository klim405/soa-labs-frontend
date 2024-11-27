<script setup lang="ts">
import TextInput from '@/components/ui/inputs/TextInput.vue'
import { ref } from 'vue'
import { ButtonFormStyle, ElemColor, InputStatus } from '@/utils/style/style'
import SimpleButton from '@/components/ui/buttons/SimpleButton.vue'
import MainHeader from '@/components/MainHeader.vue'
import { ofetch } from 'ofetch'
import { XMLBuilder, XMLParser } from 'fast-xml-parser'
import { MusicGenre } from '@/utils/schemas/musicGenre'

const value = ref('')


</script>

<template>
  <div class="test-page">
    <MainHeader/>
    <div class="content">
      <TextInput label-text="Label text" help-text="ahahaha" v-model="value" placeholder="Placeholder"></TextInput>
      <TextInput label-text="Label text" help-text="ahahaha" v-model="value" placeholder="Placeholder" :status="InputStatus.SUCCESS"></TextInput>
      <TextInput label-text="Label text" help-text="ahahaha" v-model="value" placeholder="Placeholder" :status="InputStatus.WARNING"></TextInput>
      <TextInput label-text="Label text" help-text="ahahaha" v-model="value" placeholder="Placeholder" :status="InputStatus.ERROR"></TextInput>
      <SimpleButton>jfskfjskfjs</SimpleButton>
      <SimpleButton disabled="true">jfskfjskfjs</SimpleButton>
      <SimpleButton :elem-color="ElemColor.PRIMARY" @click="async () => {
        await ofetch('https://localhost:8443/music-bands', {
          method: 'GET',
          parseResponse: (txt) => new XMLParser({
          tagValueProcessor: (tagName, tagValue, jPath, hasAttributes, isLeafNode) => {
            console.log(tagName, tagValue, jPath, hasAttributes, isLeafNode)
            if (tagName == 'genre') {
              return MusicGenre[tagValue as keyof typeof MusicGenre];
            }
            if (tagName == 'creationDate') {
              return new Date(tagValue);
            }
            return tagValue;
          }
          }).parse(txt),
          async onResponse({ request, response, options }) {
            // Log response
            console.log('[fetch response]', request, response.status, response.body);
            console.log(response._data)
            console.log(new XMLBuilder().build(response._data))
      }
        })
      }">Click me</SimpleButton>
      <SimpleButton :elem-color="ElemColor.PRIMARY" disabled="true">jfskfjskfjs</SimpleButton>
      <SimpleButton :elem-color="ElemColor.SUCCESS">jfskfjskfjs</SimpleButton>
      <SimpleButton :elem-color="ElemColor.SUCCESS" disabled="true">jfskfjskfjs</SimpleButton>
      <SimpleButton :elem-color="ElemColor.WARNING">jfskfjskfjs</SimpleButton>
      <SimpleButton :elem-color="ElemColor.WARNING" disabled="true">jfskfjskfjs</SimpleButton>
      <SimpleButton :elem-color="ElemColor.DANGER">jfskfjskfjs</SimpleButton>
      <SimpleButton :elem-color="ElemColor.DANGER" disabled="true">jfskfjskfjs</SimpleButton>
      <SimpleButton :form-style="ButtonFormStyle.OUTLINE">jfskfjskfjs</SimpleButton>
      <SimpleButton :form-style="ButtonFormStyle.OUTLINE" disabled="true">jfskfjskfjs</SimpleButton>
      <SimpleButton :form-style="ButtonFormStyle.OUTLINE" :elem-color="ElemColor.PRIMARY">jfskfjskfjs</SimpleButton>
      <SimpleButton :form-style="ButtonFormStyle.OUTLINE" :elem-color="ElemColor.PRIMARY" disabled="true">jfskfjskfjs</SimpleButton>
      <SimpleButton :form-style="ButtonFormStyle.OUTLINE" :elem-color="ElemColor.SUCCESS">jfskfjskfjs</SimpleButton>
      <SimpleButton :form-style="ButtonFormStyle.OUTLINE" :elem-color="ElemColor.SUCCESS" disabled="true">jfskfjskfjs</SimpleButton>
      <SimpleButton :form-style="ButtonFormStyle.OUTLINE" :elem-color="ElemColor.WARNING">jfskfjskfjs</SimpleButton>
      <SimpleButton :form-style="ButtonFormStyle.OUTLINE" :elem-color="ElemColor.WARNING" disabled="true">jfskfjskfjs</SimpleButton>
      <SimpleButton :form-style="ButtonFormStyle.OUTLINE" :elem-color="ElemColor.DANGER">jfskfjskfjs</SimpleButton>
      <SimpleButton :form-style="ButtonFormStyle.OUTLINE" :elem-color="ElemColor.DANGER" disabled="true">jfskfjskfjs</SimpleButton>
    </div>
  </div>
</template>

<style scoped>
.test-page {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;

  .content {
    display: block;
    width: 600px;
    height: auto;
  }
}
</style>
