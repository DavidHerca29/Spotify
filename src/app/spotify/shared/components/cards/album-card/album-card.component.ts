import { Component, Input } from '@angular/core';
import { Album } from '../../../../interfaces/spotify-albums.interfaces';
import { LazyImageComponent } from "../../lazy-image/lazy-image.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'album-card',
    standalone: true,
    templateUrl: './album-card.component.html',
    imports: [LazyImageComponent],
    styles: `.artist-chip{
      max-width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
    }`
})
export class AlbumCardComponent {

  @Input()
  public albumItem!: Album;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(!this.albumItem) throw new Error('Album is required');
  }

  getUrl(): SafeResourceUrl {
    const url = `https://open.spotify.com/embed/album/${this.albumItem.id}?utm_source=generator`
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


}
