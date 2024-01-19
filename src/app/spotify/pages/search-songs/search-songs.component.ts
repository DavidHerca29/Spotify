import { Component } from '@angular/core';
import { SearchBoxComponent } from '../../shared/components/search-box/search-box.component';
import { SpotifyService } from '../../services/spotify.service';
import { CardsListComponent } from "../../shared/components/cards/cards-list/cards-list.component";
import { Album } from '../../interfaces/spotify-albums.interfaces';

@Component({
  selector: 'app-search-songs',
  standalone: true,
  imports: [SearchBoxComponent, CardsListComponent],
  templateUrl: './search-songs.component.html',
  styles: ``
})
export class SearchSongsComponent {

  constructor(private spotifyService: SpotifyService) { }

  get searchSongs(): Album[]{
    return this.spotifyService.searchSongs;
  }

  searchForSongs = (songName: string) => {
    this.spotifyService.searchForSong(songName);
  }

}
