import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../../services/spotify.service.service';

@Component({
  selector: 'shared-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(private spotifyService: SpotifyService){}

  get elements(): string[]{
    return this.spotifyService.songsHistory;
  }

  searchTag(element: string) {
    // this.spotifyService.searchTag(tag);
    //console.log(tag);
  }

}
