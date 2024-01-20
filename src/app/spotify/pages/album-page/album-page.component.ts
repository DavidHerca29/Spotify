import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Artist } from '../../interfaces/spotify-searchArtist.interfaces';
import { Track } from '../../interfaces/spotify-tracks.interfaces';
import { SongsTableComponent } from '../../shared/components/songs-table/songs-table.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-album-page',
  standalone: true,
  imports: [CommonModule, SongsTableComponent, RouterModule],
  templateUrl: './album-page.component.html',
  styles: `
  .link-no-decoration {
    color: inherit; /* Hereda el color del texto del elemento padre */
    text-decoration: none; /* Elimina el subrayado */
  }
  `
})
export class AlbumPageComponent {
  public artist?: Artist;
  public trackList?: Track[] = [];

  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private spotifyService: SpotifyService,
    private location: Location,
  ){}

  ngOnInit(): void {
    this.activedRoute.params
      .pipe(
        switchMap(({artist}) => this.spotifyService.searchArtistById(artist))
      )
      .subscribe (artist => {
        if(!artist) return this.router.navigateByUrl('');
        else return this.artist = artist;
      });
    
    this.activedRoute.params
      .pipe(
        switchMap(({ id }) => this.spotifyService.getAlbumTracks(id))
      )
      .subscribe(album => {
        if (!album) return this.router.navigateByUrl('');
        else{
          for (let i = 0; i < album.tracks.items.length; i++) {
            album.tracks.items[i].album = album;
          }
          return this.trackList = album.tracks.items;
        } 
      });
  }

  get tracks(): Track[]{
    return this.trackList || [];
  }

  goBack(): void {
    this.location.back();
  }

}