import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  private baseURL = 'http://localhost:8080'
  constructor(private http: HttpClient) { }

  getSessionsByMovieID(id: number): Observable<Session[]> {
    return this.http.get<Session[]>(this.baseURL + '/sessions/' + id);
  }
}
