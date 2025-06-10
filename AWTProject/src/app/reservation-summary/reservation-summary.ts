import { Component, Input } from '@angular/core';
import { Session } from '../shared/models/session.model';
//import { RouterLink } from '@angular/router';
//import { Movie } from '../shared/models/movie.model';
//import { Session } from '../shared/models/session.model';

@Component({
  selector: 'app-reservation-summary',
  imports: [],
  templateUrl: './reservation-summary.html',
  styleUrl: './reservation-summary.scss'
})

export class ReservationSummary {
  @Input() movieTitle!: string;
  session!: Session;
  @Input() seats: string[] = [];
  @Input() totalPrice!: number;

  confirmReservation(): void {
    // Call to the service that saves the reservation in the backend
  }
}
