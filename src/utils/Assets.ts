import type APIClub from '~/models/clubs/APIClub';
import type APIUser from '~/models/users/APIUser';
import API from './api';
import type { FeaturedArtist } from '~/models/artists/FeaturedArtist';
import type { FeaturedArtistAlbum } from '~/models/artists/FeaturedArtistAlbum';
import type { FeaturedArtistTrack } from '~/models/artists/FeaturedArtistTrack';

export default class Assets {
    static Avatar(user?: APIUser) {
        let url = `${API.AssetsUrl}/avatar/${user?.avatar || 'default'}`;
        if (user?.avatar_animated) url += '_a.gif';
        return url;
    }

    static Banner(user?: APIUser) {
        let url = `${API.AssetsUrl}/banner/${user?.banner || 'default'}`;
        if (user?.banner_animated) url += '_a.gif';
        return url;
    }

    static Background(id: number, lg: boolean = false) {
        return `${API.AssetsUrl}/background/${id}${lg ? '-lg' : ''}`;
    }

    static BackgroundPreview(id: number) {
        return `${API.AssetsUrl}/background/${id}-sm`;
    }

    static Cover(id: number, lg: boolean = false) {
        return `${API.AssetsUrl}/cover/${id}${lg ? '-lg' : ''}`;
    }

    static CoverPreview(id: number) {
        return `${API.AssetsUrl}/cover/${id}-sm`;
    }

    static ClubIcon(club?: APIClub) {
        return `${API.AssetsUrl}/club-icon/${club?.icon || 'default'}`;
    }

    static ClubBanner(club?: APIClub) {
        return `${API.AssetsUrl}/club-banner/${club?.banner || 'default'}`;
    }

    static ArtistIcon(artist: FeaturedArtist) {
        const base = import.meta.dev ? '' : API.AssetsUrl;
        return `${base}/featured-artist/${artist.id}/icon.png`;
    }

    static ArtistCover(artist: FeaturedArtist, album: FeaturedArtistAlbum) {
        const base = import.meta.dev ? '' : API.AssetsUrl;
        return `${base}/featured-artist/${artist.id}/${album.id}/cover.png`;
    }

    static ArtistTrack(artist: FeaturedArtist, album: FeaturedArtistAlbum, track: FeaturedArtistTrack, preview: boolean) {
        const base = import.meta.dev ? '' : API.AssetsUrl;
        return `${base}/featured-artist/${artist.id}/${album.id}/${track.id}/${preview ? 'preview' : 'audio'}.ogg`;
    }
}
