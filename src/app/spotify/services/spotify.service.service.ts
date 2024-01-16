import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { SpotiToken } from '../interfaces/spotify.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private clientId: string = '6cb0905e835c4b25be3a750520743a5e';
  private clientSecret: string = 'c2e235b40f2847a2a510ec5fe97aea88';
  tokenUrl: string = 'https://accounts.spotify.com/api/token';
  idAndSecret: string = btoa(this.clientId + ':' + this.clientSecret);
  private token: string = '';
  http: any;

  private _songsHistory : string[] = [];

  constructor(private httpClient: HttpClient) {}

  // body = {
  //     'grant_type': "client_credentials",
  // };
  body = 'grant_type=client_credentials';

  options = {
    headers: new HttpHeaders({
      Authorization: 'Basic '.concat(this.idAndSecret),
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  getAccessToken_(): string {
    const url = this.tokenUrl;
    this.httpClient
      .post<SpotiToken>(url, this.body, this.options)
      .pipe(
        map((response) => response.access_token),
        catchError(() => of(''))
      )
      .subscribe((token) => {
        this.token = token;
      });

    return this.token;
  }

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
}