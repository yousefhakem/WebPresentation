import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seat } from '../models/seat.model';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {

  private baseURL = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  getById(id: string): Observable<Seat> {
    return this.http.get<Seat>(this.baseURL + '/api/seats/' + id);
  }

  getByRoomId(roomId: string): Observable<Seat[]> {
    return this.http.get<Seat[]>(this.baseURL + '/api/seats/room/' + roomId);
  }
}
