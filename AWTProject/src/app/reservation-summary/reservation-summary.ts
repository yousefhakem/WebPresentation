import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Session } from '../shared/models/session.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Movie } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';
import { SessionsService } from '../shared/services/sessions.service';
import { CommonModule } from '@angular/common';
import { Seat } from '../shared/models/seat.model';
import { ReservationService } from '../shared/services/reservation.service';
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

  constructor(
    private movieService: MovieService,
    private sessionService: SessionsService,
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router
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


  confirmReservation(): void {
    const token = localStorage.getItem('token')!;
    console.log(token);
    if (!token || this.expiredToken(token)) {
      this.router.navigate(['/auth']);
    }


    const userId = JSON.parse(atob(token.split('.')[1])).id;
    const screeningId = this.session.id; // o el identificador que uses
    const seatIds = this.seats.map(seat => seat.id); // suponiendo que cada Seat tiene .id

    this.reservationService.createReservation(screeningId, seatIds).subscribe({
      next: () => {
        alert('¡Reservation confirmed!');
        this.router.navigate(['/home']);
      },
      error: err => {
        console.error(err);
        alert('Error confiming the reservation');
      }
    });
  }
}
