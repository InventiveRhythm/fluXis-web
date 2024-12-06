import { type FeaturedArtistTrack } from "./FeaturedArtistTrack"

export type FeaturedArtistAlbum = { 
    id: string
    name: string
    release: {
        year: number
        month: number
        day: number
    }
    colors: {
        accent: string
        text: string
        text2: string
        bg: string
        bg2: string
    }
    tracks: FeaturedArtistTrack[]
}