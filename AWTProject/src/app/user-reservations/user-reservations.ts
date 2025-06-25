import { ChangeDetectorRef, Component } from '@angular/core';
import { ReservationService } from '../shared/services/reservation.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Reservation } from '../shared/models/reservation.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-user-reservations',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-reservations.html',
  styleUrl: './user-reservations.scss'
})
export class UserReservations {
  reservations: Reservation[] = [];
  error = '';

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    public auth: AuthService,
    private cdr: ChangeDetectorRef
  ) { }


  goToLogin() {
    this.router.navigate(['/auth'], { queryParams: { returnUrl: '/' } });
  }

  ngOnInit(): void {
    console.log('Requesting your reservations…');
    this.reservationService.getMyReservations().subscribe({
      next: list => {
        console.log('Reservations received:', list);
        this.reservations = list;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error loading the reservations:', err);
        this.error = 'Could not load your reservations.';
      }
    });

  }

}
