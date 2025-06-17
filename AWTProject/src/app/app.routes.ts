import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { Login } from './login/login';
import { MovieDetail } from './movie-detail/movie-detail';
import { ReservationSummary } from './reservation-summary/reservation-summary';

export const routes: Routes = [
	{ path: 'home', component: HomeComponent},
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'login', component: Login},
	{ path: 'movies/:id', component: MovieDetail},
	{ path: 'reservation', component: ReservationSummary}
];
