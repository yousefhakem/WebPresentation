import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Seat } from '../shared/models/seat.model';
import { SeatsService } from '../shared/services/seats.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seat-selector',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './seat-selector.html',
  styleUrl: './seat-selector.scss'
})
export class SeatSelector implements OnInit {
  roomID!: string;
  movieID!: string;
  sessionID!: string;
  seats!: Seat[]
  selectedSeats: Seat[] = [];

  constructor(
    private seatService: SeatsService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.roomID = this.route.snapshot.paramMap.get("roomId")!;
    this.movieID = this.route.snapshot.paramMap.get("movieId")!;
    this.sessionID = this.route.snapshot.paramMap.get("sessionId")!;

    this.seatService.getByRoomId(this.roomID).subscribe(seats => {
      this.seats = seats;
      this.cdr.detectChanges();
      console.log("loaded seats: ", seats);
    }
    )
  }

  isSelected(seat: Seat): boolean {
    return this.selectedSeats.includes(seat);
  }

  toggleSeat(seat: Seat): void {
    if (seat.isReserved) return;

    if (this.isSelected(seat)) {
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
    } else {
      this.selectedSeats.push(seat);
    }

    console.log(this.selectedSeats);
  }

  confirmSelection(): void {
    const seatsParam = JSON.stringify(this.selectedSeats);

    this.router.navigate(
      ['/reservation', this.movieID, this.sessionID],
      {
        queryParams: { seats: seatsParam }
      }
    );
  }

}
