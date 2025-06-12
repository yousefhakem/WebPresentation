import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss'
})
export class MovieCard {
  @Input() movie!: Movie;
  ngOnInit() {
    console.log('MovieCard recibido:', this.movie);
  }

}
