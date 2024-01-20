import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Artist } from '../../interfaces/spotify-searchArtist.interfaces';

@Component({
  selector: 'app-artist-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artist-page.component.html',
  styles: ``
})
export class ArtistPageComponent {
  public artist?: Artist;
  //public Artist?: Artist | null = null;

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
  }

  goBack(): void {
    this.location.back();
  }



}
