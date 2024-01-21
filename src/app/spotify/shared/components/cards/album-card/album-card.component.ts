import { Component, Input } from '@angular/core';
import { Album } from '../../../../interfaces/spotify-albums.interfaces';
import { LazyImageComponent } from "../../lazy-image/lazy-image.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'album-card',
    standalone: true,
    templateUrl: './album-card.component.html',
    imports: [LazyImageComponent, RouterModule],
    styles: `
    .artist-chip{
      max-width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .link-no-decoration {
      color: inherit; /* Hereda el color del texto del elemento padre */
      text-decoration: none; /* Elimina el subrayado */
    }
    `
})
export class AlbumCardComponent {

  @Input()
  public albumItem!: Album;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if(!this.albumItem) throw new Error('Album is required');
  }

  getUrl(): SafeResourceUrl {
    const url = `https://open.spotify.com/embed/album/${this.albumItem.id}?utm_source=generator`
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


}
