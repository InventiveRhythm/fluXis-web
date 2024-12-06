import { type FeaturedArtistAlbum } from "./FeaturedArtistAlbum"

export type FeaturedArtist = { 
    id: string
    name: string
    description: string
    albums: FeaturedArtistAlbum[]
}