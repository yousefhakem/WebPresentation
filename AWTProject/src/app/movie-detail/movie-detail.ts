import { Component, OnInit } from '@angular/core';
import { Session } from '../shared/models/session.model';
import { SessionCard } from "../shared/components/session-card/session-card";
import { Movie } from '../shared/models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../shared/services/movie.service';
import { SessionsService } from '../shared/services/sessions.service';

@Component({
  selector: 'app-movie-detail',
  imports: [SessionCard],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss'
})
export class MovieDetail implements OnInit{
  sessions: Session[] = [];
  movie!: Movie;
  movieID!: number;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sessionsService: SessionsService
  ) {}

  ngOnInit(): void {
    this.movieID = Number(this.route.snapshot.paramMap.get("id"));

    this.movieService.getMovieByID(this.movieID).subscribe( movie => {
      this.movie = movie;
    })

    this.sessionsService.getSessionsByMovieID(this.movieID).subscribe( sessions => {
      this.sessions = sessions;
    })
  }
}
