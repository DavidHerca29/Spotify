import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { SpotiToken } from '../interfaces/spotify-tokens.interfaces';
import {
  NewRealeses,
  Album,
  Albums,
  SearchResults,
} from '../interfaces/spotify-albums.interfaces';
import { ArtistSearch } from '../interfaces/spotify-searchArtist.interfaces';
import { SearchHistory } from '../interfaces/search-history.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  public NewReleases: Album[] = [];
  public searchSongs: Album[] = [];
  public artistAlbums: Album[] = [];
  public tracks: Album[] = [];
  public albums: Album[] = [];
  private artistId: string = '';

  private clientId: string = '8ebc4d8ca0f8437eb99e513dc8613420';
  private clientSecret: string = 'f0037e5902934b069a8c725e9e7e0e66';
  private tokenUrl: string = 'https://accounts.spotify.com/api/token';
  private idAndSecret: string = btoa(this.clientId + ':' + this.clientSecret);
  private token: string = '';
  private apiUrl = 'https://api.spotify.com/v1';

  public searchHistory: SearchHistory[] = [];

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

  private saveSearchHistory() {
    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
  }

  public getSearchHistory() {
    let searchHistory = localStorage.getItem('searchHistory');
    if (searchHistory) {
      this.searchHistory = JSON.parse(searchHistory);
    }
  }

  public organizeSearchHistory(search: string, path: string) {
    search = search.toLocaleLowerCase().trim();

    //check if search is already in history, if that is the case, remove it and add it to the top. Else, add it to the top
    let index = this.searchHistory.findIndex(
      (element) => element.search === search && element.path === path
    );
    if (index !== -1) {
      this.searchHistory.splice(index, 1);
    }
    this.searchHistory.unshift({ search, path });
    
    //save history in local storage
    this.saveSearchHistory();
  }

  getNewReleases(): void {
    this.getAccessToken()
      .pipe(
        catchError(() => of(null)),
        switchMap((token: SpotiToken | null) => {
          if (token) {
            const headers = new HttpHeaders({
              Authorization: `Bearer ${token.access_token}`,
            });

            return this.httpClient
              .get<NewRealeses>(`${this.apiUrl}/browse/new-releases`, {
                headers,
              })
              .pipe(catchError(() => of(null)));
          } else {
            return of(null);
          }
        })
      )
      .subscribe((newReleases: NewRealeses | null) => {
        if (newReleases) {
          this.NewReleases = newReleases.albums.items;
        } else {
          // Manejar el caso en que no se pudo obtener el token o la solicitud HTTP falló
        }
      });
  }

  searchForArtist(artistName: string): Observable<ArtistSearch | null> {
    return this.getAccessToken().pipe(
      catchError(() => of(null)),
      switchMap((token: SpotiToken | null) => {
        if (token) {
          const headers = new HttpHeaders({
            Authorization: `Bearer ${token.access_token}`,
          });

          const params = new HttpParams()
            .set('q', artistName)
            .set('type', 'artist');

          return this.httpClient
            .get<ArtistSearch>(`${this.apiUrl}/search`, {
              headers: headers,
              params: params,
            })
            .pipe(catchError(() => of(null)));
        } else {
          return of(null);
        }
      })
    );
  }

  searchForSong(songName: string): void {
    this.getAccessToken()
      .pipe(
        catchError(() => of(null)),
        switchMap((token: SpotiToken | null) => {
          if (token) {
            const headers = new HttpHeaders({
              Authorization: `Bearer ${token.access_token}`,
            });

            const params = new HttpParams()
              .set('q', songName)
              .set('type', 'track');

            return this.httpClient
              .get<SearchResults>(`${this.apiUrl}/search`, {
                headers: headers,
                params: params,
              })
              .pipe(catchError(() => of(null)));
          } else {
            return of(null);
          }
        })
      )
      .subscribe((songsSearch: SearchResults | null) => {
        if (songsSearch) {
          this.searchSongs = [];
          for (let i = 0; i < songsSearch.tracks.items.length; i++) {
            this.searchSongs.push(songsSearch.tracks.items[i].album);
          }
          this.organizeSearchHistory(songName, 'search/songs');
        } else {
          // Manejar el caso en que no se pudo obtener el token o la solicitud HTTP falló
        }
      });
  }

  getArtistAlbums(artistId: string, artistName: string): void {
    this.getAccessToken()
      .pipe(
        catchError(() => of(null)),
        switchMap((token: SpotiToken | null) => {
          if (token) {
            const headers = new HttpHeaders({
              Authorization: `Bearer ${token.access_token}`,
            });

            return this.httpClient
              .get<Albums>(`${this.apiUrl}/artists/${artistId}/albums`, {
                headers,
              })
              .pipe(catchError(() => of(null)));
          } else {
            return of(null);
          }
        })
      )
      .subscribe((artistAlbums: Albums | null) => {
        if (artistAlbums) {
        this.artistAlbums = [];
          this.artistAlbums = artistAlbums.items;
          this.organizeSearchHistory(artistName, 'search/artist');
        } else {
          // Manejar el caso en que no se pudo obtener el token o la solicitud HTTP falló
        }
      });
  }
}
