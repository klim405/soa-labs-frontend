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
  name: number
  coordinates: Coordinates
  description: string | null
  numberOfParticipants: number | null
  creationDate: Date
  genre: MusicGenre
  label?: Label
}
