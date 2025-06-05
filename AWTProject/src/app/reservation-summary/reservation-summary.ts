import { Component, Input } from '@angular/core';
//import { RouterLink } from '@angular/router';
//import { Movie } from '../shared/models/movie.model';
//import { Session } from '../shared/models/session.model';

@Component({
  selector: 'app-reservation-summary',
  imports: [],
  templateUrl: './reservation-summary.html',
  styleUrl: './reservation-summary.scss'
})

export class ReservationSummaryComponent {
  @Input() movieTitle!: string;
  @Input() dateTime!: Date;
  @Input() language!: string;
  @Input() screenName!: string;
  @Input() seats: string[] = [];
  @Input() totalPrice!: number;

  confirmReservation(): void {
    // Aquí haces la llamada al servicio que guarda la reserva en el backend
  }
}
