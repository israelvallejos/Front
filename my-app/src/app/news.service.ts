import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://api.spaceflightnewsapi.net/v4/articles/';

  constructor(private http: HttpClient) { }

  getLatestNews(offset: number, limit: number): Observable<ApiResponse> {
    let params = new HttpParams();
    params = params.append('limit', limit.toString());
    params = params.append('offset', offset.toString());

    return this.http.get<ApiResponse>(this.apiUrl, { params: params });
  }
}
