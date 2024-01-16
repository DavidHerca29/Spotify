import { Routes } from '@angular/router';
import { HomePageComponent } from './spotify/pages/home-page/home-page.component';
import { SearchArtistComponent } from './spotify/pages/search-artist/search-artist.component';
import { SearchSongsComponent } from './spotify/pages/search-songs/search-songs.component';

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
