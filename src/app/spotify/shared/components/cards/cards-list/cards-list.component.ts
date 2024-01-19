import { Component, Input } from '@angular/core';
import { Album } from '../../../../interfaces/spotify-albums.interfaces';
import { AlbumCardComponent } from '../album-card/album-card.component';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [AlbumCardComponent],
  templateUrl: './cards-list.component.html',
  styles: ``
})
export class CardsListComponent {
  @Input() 
  public albums: Album[] = [];
}
