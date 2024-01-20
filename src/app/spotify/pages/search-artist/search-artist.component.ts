import { Component} from '@angular/core';
import { SearchBoxComponent } from "../../shared/components/search-box/search-box.component";
import { SpotifyService } from '../../services/spotify.service';
import { CardsListComponent } from "../../shared/components/cards/cards-list/cards-list.component";
import { Album } from '../../interfaces/spotify-albums.interfaces';
import { ArtistSearch } from '../../interfaces/spotify-searchArtist.interfaces';

@Component({
    selector: 'app-search-artist',
    standalone: true,
    templateUrl: './search-artist.component.html',
    styles: ``,
    imports: [SearchBoxComponent, CardsListComponent]
})
export class SearchArtistComponent {

  private artistId: string = '';
      
    constructor(private spotifyService: SpotifyService) { }

  get artistAlbums(): Album[]{
    return this.spotifyService.artistAlbums;
  }

  searchArtistAlbums = (artistName: string) => {
    this.spotifyService.searchForArtist(artistName)
      .subscribe((artistSearch: ArtistSearch | null) => {
      if (artistSearch) {
        this.artistId = artistSearch.artists.items[0].id;
        this.spotifyService.getArtistAlbums(this.artistId, artistName);
      } else {
        
      }
    });
  }
}



