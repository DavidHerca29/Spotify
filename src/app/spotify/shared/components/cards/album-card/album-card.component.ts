import { Component, Input } from '@angular/core';
import { Item } from '../../../../interfaces/spotify-newrealeses.interfaces';
import { SpotifyService } from '../../../../services/spotify.service';
import { LazyImageComponent } from "../../lazy-image/lazy-image.component";

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
  public albumItem!: Item;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(!this.albumItem) throw new Error('Album is required');
  }


}
