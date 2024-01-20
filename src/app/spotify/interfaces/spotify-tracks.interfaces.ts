export interface Tracks {
    tracks: Track[];
    items:  Track[];
}

export interface Track {
    album:         TrackAlbum;
    artists:       Artist[];
    disc_number:   number;
    duration_ms:   number;
    explicit:      boolean;
    external_ids:  ExternalIDS;
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    is_local:      boolean;
    is_playable:   boolean;
    name:          string;
    popularity:    number;
    preview_url:   string;
    track_number:  number;
    type:          TrackType;
    uri:           string;
}

export interface TrackAlbum {
    images:                 Image[];
    name:                   string;
    artists:                Artist[];
    id:                     string;
    tracks:                 Tracks;
}

export interface Artist {
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    name:          string;
    type:          ArtistType;
    uri:           string;
}

export interface Image {
    height: number;
    url:    string;
    width:  number;
}

export interface ExternalUrls {
    spotify: string;
}

export enum ArtistType {
    Artist = "artist",
}

export interface ExternalIDS {
    isrc: string;
}

export enum TrackType {
    Track = "track",
}




