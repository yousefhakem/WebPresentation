import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Session } from '../shared/models/session.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Movie } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';
import { SessionsService } from '../shared/services/sessions.service';
import { CommonModule } from '@angular/common';
import { Seat } from '../shared/models/seat.model';
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
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
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
          isReserved: s.isReserved
        } as Seat));

        console.log('Asientos recibidos:', this.seats);
      }
    });
  }


  confirmReservation(): void {
    // Call to the service that saves the reservation in the backend
  }
}
