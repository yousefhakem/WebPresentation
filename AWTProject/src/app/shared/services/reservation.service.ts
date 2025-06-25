// shared/services/reservation.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seat } from '../models/seat.model';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createReservation( screeningId: string, seatIds: string[]): Observable<any> {
    const body = { screeningId, seatIds };
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(this.baseURL + '/api/reservations', body, { headers });
  }

  getMyReservations(): Observable<Reservation[]> {
    const token = localStorage.getItem('token')!;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Reservation[]>(`${this.baseURL}/api/reservations/user`, { headers });
  }
}
