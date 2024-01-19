import { Component, OnInit } from '@angular/core';
import { SearchBoxComponent } from "../../shared/components/search-box/search-box.component";
import { SpotifyService } from '../../services/spotify.service';
import { CardsListComponent } from "../../shared/components/cards/cards-list/cards-list.component";
import { Item } from '../../interfaces/spotify-newrealeses.interfaces';
import { ArtistSearch } from '../../interfaces/spotify-searchArtist.interfaces';

@Component({
    selector: 'app-search-artist',
    standalone: true,
    templateUrl: './search-artist.component.html',
    styles: ``,
    imports: [SearchBoxComponent, CardsListComponent]
})
export class SearchArtistComponent implements OnInit {

  private artistId: string = '';
      
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

  get artistAlbums(): Item[]{
    return this.spotifyService.artistAlbums;
  }

  searchArtistAlbums = (artistName: string) => {
    this.spotifyService.searchForArtist(artistName)
      .subscribe((artistSearch: ArtistSearch | null) => {
      if (artistSearch) {
        console.log(artistSearch);
        console.log("Artist ID is: "+artistSearch.artists.items[0].id);
        this.artistId = artistSearch.artists.items[0].id;
        this.spotifyService.getArtistAlbums(this.artistId);
      } else {
        // Manejar el caso en que no se pudo obtener el token o la solicitud HTTP falló
      }
    });
  }
}



