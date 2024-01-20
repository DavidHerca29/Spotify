import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Artist } from '../../interfaces/spotify-searchArtist.interfaces';
import { Track } from '../../interfaces/spotify-tracks.interfaces';
import { SongsTableComponent } from '../../shared/components/songs-table/songs-table.component';

@Component({
  selector: 'app-artist-page',
  standalone: true,
  imports: [CommonModule, SongsTableComponent],
  templateUrl: './artist-page.component.html',
  styles: ``
})
export class ArtistPageComponent implements OnInit {
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
        switchMap(({id}) => this.spotifyService.searchArtistById(id))
      )
      .subscribe (artist => {
        if(!artist) return this.router.navigateByUrl('');
        else return this.artist = artist;
      });

    this.activedRoute.params
      .pipe(
        switchMap(({ id }) => this.spotifyService.getArtistTracks(id))
      )
      .subscribe(track => {
        if (!track) return this.router.navigateByUrl('');
        else return this.trackList = track.tracks;
      });
  }

  get tracks(): Track[]{
    return this.trackList || [];
  }

  goBack(): void {
    this.location.back();
  }



}
