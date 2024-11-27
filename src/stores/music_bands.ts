import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { ofetch } from 'ofetch'
import { XMLBuilder, XMLParser } from 'fast-xml-parser'
import type { MusicBand } from '@/utils/schemas/musicBand'

function parseMusicBandXML(txt: string) {
  const parser = new XMLParser({
    tagValueProcessor: (tagName, tagValue) => {
      if (tagName == "creationDate") {
        return new Date(tagValue);
      }
      return tagValue;
    }
  })
  return parser.parse(txt)["MusicBandReadSchema"]
}

export const useMusicBandStore = defineStore('music_band', () => {
  const MUSIC_BAND_URL = "https://localhost:8443"

  const musicBandList = reactive<MusicBand[]>([])

  const getMusicBand = computed((musicBandId) => {
    return musicBandList.findIndex(
      (musicBand) => musicBand.id == musicBandId
    );
  })

  function isMusicBandLoaded(id: number) {
    return musicBandList.findIndex((musicBand) => musicBand.id == id) >= 0;
  }

  async function loadMusicBand(id: number) {
    if (!isMusicBandLoaded(id)) {
      await ofetch(`${MUSIC_BAND_URL}/music-bands/${id}`, {
        method: "GET",
        parseResponse: parseMusicBandXML,
        onResponse: ({response}) => {
          if (response.status == 200) {
            musicBandList.push(response._data)
          }
        }
      })
    }
  }

  async function addMusicBand(musicBand: MusicBand) {
    await ofetch(`${MUSIC_BAND_URL}/music-bands/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/xml'
      },
      body: new XMLBuilder().build({"MusicBandCreateSchema": musicBand}),
      parseResponse: parseMusicBandXML,
      onResponse: ({response}) => {
        if (response.status == 200) {
          musicBandList.push(response._data);
        }
      }
    })
  }

  async function updateMusicBand(musicBand: MusicBand) {
    const id = musicBand.id
    await ofetch(`${MUSIC_BAND_URL}/music-bands/${id}`, {
      method: "PUT",
      parseResponse: parseMusicBandXML,
      onResponse: ({response}) => {
        if (response.status == 200) {
          const listIndex = musicBandList.findIndex((mb) => mb.id == id)
          musicBandList.splice(listIndex, 1, response._data)
        }
      }
    })
  }

  async function deleteMusicBand(id: number) {
    await ofetch(`${MUSIC_BAND_URL}/music-bands/${id}`, {
      method: "DELETE",
      parseResponse: parseMusicBandXML,
      onResponse: ({response}) => {
        if (response.status == 200) {
          const listIndex = musicBandList.findIndex((mb) => mb.id == id)
          musicBandList.splice(listIndex, 1)
        }
      }
    })
  }

  async function $reset() {
    await ofetch(`${MUSIC_BAND_URL}/music-bands`, {
      method: "GET",
      parseResponse: (txt) => {
        const parser = new XMLParser({
          tagValueProcessor: (tagName, tagValue) => {
            if (tagName == "creationDate") {
              return new Date(tagValue);
            }
            return tagValue;
          }
        })
        return parser.parse(txt)["ListWithPaginatorSchema"]["elements"]
      },
      onResponse: ({response}) => {
        if (response.status == 200) {
          musicBandList.splice(0, musicBandList.length, ...response._data)
        }
      }
    })
  }

  return {
    musicBandList,
    getMusicBand,
    loadMusicBand,
    addMusicBand,
    updateMusicBand,
    deleteMusicBand,
    $reset
  }
})
