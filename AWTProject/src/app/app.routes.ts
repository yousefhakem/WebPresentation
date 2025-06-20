import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { MovieDetail } from './movie-detail/movie-detail';
import { ReservationSummary } from './reservation-summary/reservation-summary';
import { SeatSelector } from './seat-selector/seat-selector';
import { Auth } from './auth/auth';

export const routes: Routes = [
	{ path: 'home', component: HomeComponent},
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'auth', component: Auth },
	{ path: 'movies/:id', component: MovieDetail},
	{ path: 'reservation/:movieID/:sessionID', component: ReservationSummary},
	{ path: 'seats/:movieId/:roomId/:sessionId', component: SeatSelector },

];
