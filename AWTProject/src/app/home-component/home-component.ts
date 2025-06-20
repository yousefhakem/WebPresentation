import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Movie } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';
import { Router, RouterModule } from '@angular/router';
import { MovieCard } from "../shared/components/movie-card/movie-card";
import { Auth } from '../auth/auth';
import { AuthService } from '../shared/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-home-component',
  imports: [CommonModule, RouterModule, MovieCard],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss'
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private cd: ChangeDetectorRef,
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
      console.log('Películas:', this.movies);
      this.cd.detectChanges(); // obligamos a Angular a actualizar la vista
    });
  }
  goToLogin() {
    this.router.navigate(['/auth'], { queryParams: { returnUrl: '/' } });
  }
}
