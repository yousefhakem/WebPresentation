import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../models/room.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseURL = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  getRoomByID(id: string): Observable<Room> {
    return this.http.get<Room>(this.baseURL + '/api/rooms/' + id);
  }
}
