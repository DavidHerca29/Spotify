import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { CardsListComponent } from '../../shared/components/cards/cards-list/cards-list.component';
import { Item } from '../../interfaces/spotify-newrealeses.interfaces';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CardsListComponent],
  templateUrl: './home-page.component.html',
  styles: ``
})
export class HomePageComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.spotifyService.getNewReleases();
  }

  get albums(): Item[]{
    return this.spotifyService.NewReleases;
  }

}
