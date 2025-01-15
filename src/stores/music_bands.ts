import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { ofetch } from 'ofetch'
import { XMLBuilder, XMLParser } from 'fast-xml-parser'
import type { MusicBand, MusicBandEditForm } from '@/utils/schemas/musicBand'

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

  const filterMusicBandByName = computed(() => (startsWithVal: string, orderBy: keyof MusicBand = 'id', ascending = true) => {
    const filteredList = musicBandList.filter(
      (musicBand) => String(musicBand.name).startsWith(startsWithVal)
    )
    filteredList.sort((a, b) => {
      const valueA = a[orderBy];
      const valueB = b[orderBy];
  
      if (valueA === undefined || valueB === undefined) return 0;
  
      if (valueA > valueB) return ascending ? 1 : -1;
      if (valueA < valueB) return ascending ? -1 : 1;
  
      return 0;
    });
    console.log(filteredList)
    return filteredList;
  })

  const getMusicBand = computed(() => (musicBandId: number) => {
    return musicBandList.find(
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

  async function addMusicBand(musicBand: MusicBandEditForm) {
    await ofetch(`${MUSIC_BAND_URL}/music-bands`, {
      method: "POST",
      headers: {
        'Accept': 'application/xml',
        'Content-Type': 'application/xml'
      },
      body: new XMLBuilder().build({"MusicBandCreateSchema": {
        name: musicBand.name,
        description: musicBand.description,
        coordinates: {
          x: musicBand.x,
          y: musicBand.y,
        },
        numberOfParticipants: musicBand.numberOfParticipants,
        genre: musicBand.genre,
        label: musicBand.label ? {name: musicBand.label} : undefined,
      }}),
      parseResponse: parseMusicBandXML,
      onResponse: ({response}) => {
        if (response.status == 200) {
          musicBandList.push(response._data);
        }
      }
    })
  }

  async function updateMusicBand(musicBandId: number, musicBand: MusicBandEditForm) {
    await ofetch(`${MUSIC_BAND_URL}/music-bands/${musicBandId}`, {
      method: "PUT",
      headers: {
        'Accept': 'application/xml',
        'Content-Type': 'application/xml',
      },
      body: new XMLBuilder().build({"MusicBandUpdateSchema": {
        name: musicBand.name,
        description: musicBand.description,
        coordinates: {
          x: musicBand.x,
          y: musicBand.y,
        },
        numberOfParticipants: musicBand.numberOfParticipants,
        genre: musicBand.genre,
        label: musicBand.label ? {name: musicBand.label} : undefined,
      }}),
      parseResponse: parseMusicBandXML,
      onResponse: ({response}) => {
        if (response.status == 200) {
          const listIndex = musicBandList.findIndex((mb) => mb.id == musicBandId)
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
      headers: {
        'Accept': 'application/xml',
      },
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
    filterMusicBandByName,
    getMusicBand,
    loadMusicBand,
    addMusicBand,
    updateMusicBand,
    deleteMusicBand,
    $reset
  }
})
