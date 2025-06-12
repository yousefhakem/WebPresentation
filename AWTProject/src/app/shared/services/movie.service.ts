import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model'; // Ajusta si el path difiere

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseURL = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseURL + '/api/movies'); // Ajusta la URL a tu backend
  }
  getMovieByID(id: string): Observable<Movie> {
    return this.http.get<Movie>(this.baseURL + '/api/movies/' + id);
  }
}
