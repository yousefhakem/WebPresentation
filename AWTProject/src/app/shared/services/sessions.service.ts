import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  private baseURL = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  // sessions.service.ts
getSessionsByMovieID(movieId: string): Observable<Session[]> {
  return this.http.get<Session[]>(
    this.baseURL + `/api/movies/${movieId}/screenings/`
  );
};

getSessionsbyID(movieID: string, sessionId: string): Observable<Session> {
  return this.http.get<Session>(this.baseURL + `/api/movies/${movieID}/screenings/${sessionId}`);
}


}
