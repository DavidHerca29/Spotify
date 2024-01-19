import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../../services/spotify.service';
import { SearchHistory } from '../../../interfaces/search-history.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
    constructor(private spotifyService: SpotifyService, private router: Router ) { }

    onInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.spotifyService.getSearchHistory();
    }

    get searchHistory(): SearchHistory[]{
        return this.spotifyService.searchHistory;
    }

  onClickSearch(search: string, path: string) {
    // route to path and search based on given search string
    this.router.navigateByUrl(path);
    if (path === 'search/artist') {
        this.spotifyService.searchForArtist(search);
    } else {
        this.spotifyService.searchForSong(search);
    }
  }

}
