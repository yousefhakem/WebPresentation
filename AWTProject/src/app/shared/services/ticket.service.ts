import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketsCreated = 0;
  private baseURL = "http://localhost:3000";

  constructor(
    private http: HttpClient
  ) { }

  getTicketByID(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(this.baseURL + `/api/tickets/${id}`);
  }

  createTicket(reservationId: string):Observable<any> {
    this.ticketsCreated = this.ticketsCreated + 1;
    const code = this.ticketsCreated;
    const body = { reservationId,  code};
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(this.baseURL + `/api/tickets/`, body, { headers });
  }
}
