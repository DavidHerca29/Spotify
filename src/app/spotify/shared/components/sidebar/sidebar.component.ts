import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../../services/spotify.service';
import { SearchHistory } from '../../../interfaces/search-history.interfaces';
import { Router } from '@angular/router';
import { ArtistSearch } from '../../../interfaces/spotify-searchArtist.interfaces';

@Component({
  selector: 'shared-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

    private artistId: string = '';

    constructor(private spotifyService: SpotifyService, private router: Router ) { }

    ngOnInit(): void {
        this.spotifyService.getSearchHistory();
    }

    get searchHistory(): SearchHistory[]{
        return this.spotifyService.searchHistory;
    }

  onClickSearch(search: string, path: string) {
    this.router.navigateByUrl(path);
    if (path === 'search/songs') {
        this.spotifyService.searchForSong(search);
    } else {
        this.spotifyService.searchForArtist(search)
        .subscribe((artistSearch: ArtistSearch | null) => {
            if (artistSearch) {
              this.artistId = artistSearch.artists.items[0].id;
              this.spotifyService.getArtistAlbums(this.artistId, search);
            } else {
            }
          });;
    }
  }

}
