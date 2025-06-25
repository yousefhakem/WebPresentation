import { Seat } from './seat.model';
import { Ticket } from './ticket.model';
import { Session } from './session.model';

export interface Reservation {
  id: string;
  timestamp: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;

  // Relaciones
  userId: string;
  screeningId: string;

  Seats?: Seat[];             
  Ticket?: Ticket;            
  Screening?: Session;     
}
