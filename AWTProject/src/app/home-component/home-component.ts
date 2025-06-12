import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Movie } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';
import { RouterModule } from '@angular/router';
import { MovieCard } from "../shared/components/movie-card/movie-card";

@Component({
  standalone: true,
  selector: 'app-home-component',
  imports: [CommonModule, RouterModule, MovieCard],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss'
})
export class HomeComponent implements OnInit{
  movies: Movie[] = [];

  constructor(
  private movieService: MovieService,
  private cd: ChangeDetectorRef
) {}

ngOnInit(): void {
  this.movieService.getMovies().subscribe(movies => {
    this.movies = movies;
    console.log('Películas:', this.movies);
    this.cd.detectChanges(); // obligamos a Angular a actualizar la vista
  });
}
}
