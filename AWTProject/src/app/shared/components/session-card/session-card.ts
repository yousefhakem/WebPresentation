import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Session } from '../../models/session.model';
import { RouterLink, RouterModule } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-card',
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './session-card.html',
  styleUrl: './session-card.scss'
})
export class SessionCard {
  @Input() session!: Session;
  @Input() movieID!: string;


}
