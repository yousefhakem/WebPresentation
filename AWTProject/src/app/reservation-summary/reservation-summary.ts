import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Session } from '../shared/models/session.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Movie } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';
import { SessionsService } from '../shared/services/sessions.service';
import { CommonModule } from '@angular/common';
import { Seat } from '../shared/models/seat.model';
import { ReservationService } from '../shared/services/reservation.service';
import { TicketService } from '../shared/services/ticket.service';
import { AuthService } from '../shared/services/auth.service';
//import { Movie } from '../shared/models/movie.model';
//import { Session } from '../shared/models/session.model';

@Component({
  selector: 'app-reservation-summary',
  imports: [RouterLink, CommonModule],
  templateUrl: './reservation-summary.html',
  styleUrl: './reservation-summary.scss'
})

export class ReservationSummary implements OnInit {
  movie!: Movie;
  movieID!: string;
  sessionID!: string;
  session!: Session;
  seats: Seat[] = [];
  @Input() totalPrice!: number;

  successMessage: string = '';
  errorMessage: string = '';


  constructor(
    private movieService: MovieService,
    private sessionService: SessionsService,
    private reservationService: ReservationService,
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.movieID = this.route.snapshot.paramMap.get("movieID")!;
    this.movieService.getMovieByID(this.movieID).subscribe(movie => {
      this.movie = movie;
      this.cdr.detectChanges();
      console.log("Movie: ", this.movie);
    });

    this.sessionID = this.route.snapshot.paramMap.get("sessionID")!;
    this.sessionService.getSessionsbyID(this.movieID, this.sessionID).subscribe(session => {
      this.session = session;
      this.cdr.detectChanges();
      console.log("Session: ", this.session);
    });
    this.route.queryParamMap.subscribe(params => {
      const seatsParam = params.get('seats');
      if (seatsParam) {
        const rawSeats = JSON.parse(seatsParam);
        this.seats = rawSeats.map((s: any) => ({
          row: s.row,
          number: s.number,
          isReserved: s.isReserved,
          id: s.id
        } as Seat));

        console.log('Asientos recibidos:', this.seats);
      }
    });
  }
  expiredToken(token: string): boolean {
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const ahora = Math.floor(Date.now() / 1000); // tiempo actual en segundos
      return payload.exp && payload.exp < ahora;
    } catch (e) {
      // Si el token no es válido o no se puede decodificar, consideramos que ha expirado
      return true;
    }
  }

  goToLogin() {
    this.router.navigate(['/auth'], { queryParams: { returnUrl: '/' } });
  }

  confirmReservation(): void {
    const token = localStorage.getItem('token')!;
    if (!token || this.expiredToken(token)) {
      this.router.navigate(['/auth']);
      return;
    }

    const userId = JSON.parse(atob(token.split('.')[1])).id;
    const screeningId = this.session.id;
    const seatIds = this.seats.map(seat => seat.id);

    this.reservationService.createReservation(screeningId, seatIds).subscribe({
      next: (reservation: any) => {
        const reservationId = reservation.id;

        this.ticketService.createTicket(reservationId).subscribe({
          next: () => {
            this.successMessage = 'Reservation confirmed! You will receive your ticket on your email.';
            this.cdr.detectChanges();
          },
          error: err => {
            console.error(err);
            this.errorMessage = 'Reservation was created, but there has been a problem when creating the ticket. ';
            this.cdr.detectChanges();
          }
        });
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Error when creating the reservation.';
        this.cdr.detectChanges();
      }
    });
  }

}
