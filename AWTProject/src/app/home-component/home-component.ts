import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss'
})
export class HomeComponent implements OnInit{
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}
  
  ngOnInit(): void {
   this.movieService.getMovies().subscribe({
      next: (data) => this.movies = data,
      error: (err) => console.error('Error fetching movies', err),
    })
  }
}
