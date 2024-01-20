import { Routes } from '@angular/router';
import { HomePageComponent } from './spotify/pages/home-page/home-page.component';
import { SearchArtistComponent } from './spotify/pages/search-artist/search-artist.component';
import { SearchSongsComponent } from './spotify/pages/search-songs/search-songs.component';
import { ArtistPageComponent } from './spotify/pages/artist-page/artist-page.component';
import { AlbumPageComponent } from './spotify/pages/album-page/album-page.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomePageComponent,
        pathMatch: 'full'
    },
    {
        path: 'search',
        children: [
            {
                path: 'artist',
                component: SearchArtistComponent, 
                pathMatch: 'full'
            },
            {
                path: 'songs',
                component: SearchSongsComponent, 
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'artist/:id',
        component: ArtistPageComponent
    },
    {
        path: 'album/:id/:artist',
        component: AlbumPageComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
