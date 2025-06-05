import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Seat } from '../../models/seat.model';

@Component({
  selector: 'app-seat-selector',
  imports: [NgClass],
  templateUrl: './seat-selector.html',
  styleUrl: './seat-selector.scss'
})
export class SeatSelector {
  selectedSeats: Seat[] = [];

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
  }

  confirmSelection(): void {
    // Llamada al servicio para reservar
  }

}
