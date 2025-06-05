import { Component, Input } from '@angular/core';
import { Session } from '../../models/session.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-session-card',
  imports: [RouterLink],
  templateUrl: './session-card.html',
  styleUrl: './session-card.scss'
})
export class SessionCard {
  @Input() session!: Session;
}
