import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Session } from '../shared/models/session.model';
import { SessionCard } from "../shared/components/session-card/session-card";
import { Movie } from '../shared/models/movie.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../shared/services/movie.service';
import { SessionsService } from '../shared/services/sessions.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  imports: [SessionCard, CommonModule, RouterModule],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss'
})
export class MovieDetail implements OnInit {
  sessions!: Session[];
  movie!: Movie;
  movieID!: string;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sessionsService: SessionsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.movieID = this.route.snapshot.paramMap.get("id")!;

    console.log("Received route param id:", this.movieID);

    this.movieService.getMovieByID(this.movieID).subscribe(movie => {
      this.movie = movie;
      this.cdr.detectChanges();
      console.log("Loaded movie:", movie);
    });

    this.sessionsService.getSessionsByMovieID(this.movieID)
      .subscribe(sessions => {
        this.sessions = sessions;
        this.cdr.detectChanges();
        console.log("Sessions: ", sessions)
      });
  }


}
