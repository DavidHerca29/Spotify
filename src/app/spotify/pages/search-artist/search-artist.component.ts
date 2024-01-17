import { Component, OnInit } from '@angular/core';
import { SearchBoxComponent } from "../../shared/components/search-box/search-box.component";
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search-artist',
  standalone: true,
  templateUrl: './search-artist.component.html',
  styles: ``,
  imports: [SearchBoxComponent]
})
export class SearchArtistComponent implements OnInit {
      
    constructor(private spotifyService: SpotifyService) { }
  
    ngOnInit(): void {
      this.obtenerToken();
    }
  
    obtenerToken(): void {
      this.spotifyService.getAccessToken().subscribe(
        (token) => {
          if (token) {
            console.log('Token obtenido:', token);
            // Puedes realizar acciones adicionales con el token aquí
          } else {
            console.error('No se pudo obtener el token');
          }
        },
        (error) => {
          console.error('Error al obtener el token:', error);
        }
      );
  }
}



