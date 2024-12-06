import { type FeaturedArtistAlbum } from "./FeaturedArtistAlbum"

export type FeaturedArtist = { 
    id: string
    name: string
    description: string

    youtube: string
    spotify: string
    soundcloud: string
    twitter: string
    fluxis: string

    albums: FeaturedArtistAlbum[]
}