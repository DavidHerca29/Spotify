import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { SpotiToken } from '../interfaces/spotify-tokens.interfaces';
import { NewRealeses, Item } from '../interfaces/spotify-newrealeses.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  
  public NewReleases: Item[] = [];
  
  private clientId: string = '8ebc4d8ca0f8437eb99e513dc8613420';
  private clientSecret: string = 'f0037e5902934b069a8c725e9e7e0e66';
  private tokenUrl: string = 'https://accounts.spotify.com/api/token';
  private idAndSecret: string = btoa(this.clientId + ':' + this.clientSecret);
  private token: string = '';
  private apiUrl = 'https://api.spotify.com/v1';

  private _songsHistory : string[] = [];

  constructor(private httpClient: HttpClient) {}

  body = 'grant_type=client_credentials';

  options = {
    headers: new HttpHeaders({
      Authorization: 'Basic '.concat(this.idAndSecret),
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  getAccessToken(): Observable<SpotiToken | null> {
    const url = this.tokenUrl;
    return this.httpClient
      .post<SpotiToken>(url, this.body, this.options)
      .pipe(catchError(() => of(null)));
  }

  saveSongsLocalStorage() {
    localStorage.setItem('songs_history', JSON.stringify( this._songsHistory ));
  }

  get songsHistory(): string[] {
    return [...this._songsHistory];
  }

  getSongFromLocalStorage(): string[] {
    if (localStorage.getItem('songs_history')) {
      this._songsHistory = JSON.parse(localStorage.getItem('songs_history')!);
    }
    return this._songsHistory;
  }

  private organizeSongsHistory(song:string){
    song = song.toLocaleLowerCase();

    //case: si ya está el tag
    if (this._songsHistory.includes(song)){
      this._songsHistory = this._songsHistory.filter((oldSong) => oldSong !== song);
    }
    this._songsHistory.unshift(song);
    this._songsHistory = this._songsHistory.splice(0,10);
    this.saveSongsLocalStorage();
  }

  getNewReleases(): void {
    this.getAccessToken()
      .pipe(
        catchError(() => of(null)),
        switchMap((token: SpotiToken | null) => {
          if (token) {
            console.log('Token obtenido:', token);
            const headers = new HttpHeaders({
              Authorization: `Bearer ${token.access_token}`,
            });
  
            return this.httpClient
              .get<NewRealeses>(`${this.apiUrl}/browse/new-releases`, { headers })
              .pipe(catchError(() => of(null)));
          } else {
            return of(null);
          }
        })
      )
      .subscribe((newReleases: NewRealeses | null) => {
        if (newReleases) {
          this.NewReleases = newReleases.albums.items;
          console.log(newReleases);
        } else {
          // Manejar el caso en que no se pudo obtener el token o la solicitud HTTP falló
        }
      });
  }
  

  
}
