import { Component, Input } from '@angular/core';
import { Track } from '../../../interfaces/spotify-tracks.interfaces';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'songs-table',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './songs-table.component.html',
  styles: `
  .link-no-decoration {
    color: inherit; /* Hereda el color del texto del elemento padre */
    text-decoration: none; /* Elimina el subrayado */
  }
  `
})
export class SongsTableComponent {
  @Input()
  public tracks: Track[] = [];

  constructor(private sanitizer: DomSanitizer) { }


  getUrl(trackId: string): SafeResourceUrl {
    const url = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
