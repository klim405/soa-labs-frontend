import type { MusicGenre } from '@/utils/schemas/musicGenre'

export interface Coordinates {
  id: number
  x: number
  y: number
}

export interface Label {
  id: number
  name: string
}

export interface MusicBand {
  id: number
  name: string
  coordinates: Coordinates
  description?: string
  numberOfParticipants?: number
  creationDate: Date
  genre: MusicGenre
  label?: Label
}

export interface MusicBandEditForm {
  id?: number
  name: string
  x: number
  y: number
  description?: string
  numberOfParticipants?: number
  genre: string
  label?: string
}