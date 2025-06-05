import { Component } from '@angular/core';
import { Session } from '../shared/models/session.model';
import { SessionCard } from "../shared/components/session-card/session-card";

@Component({
  selector: 'app-movie-detail',
  imports: [SessionCard],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss'
})
export class MovieDetail {
  sessions: Session[] = [];
}
