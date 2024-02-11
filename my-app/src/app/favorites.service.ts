import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FavoriteNews } from './models/Favorite-News'; 
import { Page } from './models/page.model'; 

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = 'http://localhost:8080/api/favorites';

  constructor(private http: HttpClient) { }


  getAllFavorites(): Observable<FavoriteNews[]> {
    return this.http.get<FavoriteNews[]>(this.apiUrl);
  }

  searchFavoritesByTitle(title: string, pageable: any): Observable<Page<FavoriteNews>> {
    let params = new HttpParams().set('title', title);
    return this.http.get<Page<FavoriteNews>>(`${this.apiUrl}/search`, { params: {...pageable, ...params} });
  }

  createFavorite(favoriteNews: FavoriteNews): Observable<FavoriteNews> {
    console.log("body", favoriteNews)
    return this.http.post<FavoriteNews>(`${this.apiUrl}`, favoriteNews);
  }

  updateFavorite(id: number, favoriteNews: FavoriteNews): Observable<FavoriteNews> {
    return this.http.put<FavoriteNews>(`${this.apiUrl}/${id}`, favoriteNews);
  }

  getFavoriteById(id: number): Observable<FavoriteNews> {
    return this.http.get<FavoriteNews>(`${this.apiUrl}/${id}`);
  }

  deleteFavorite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
