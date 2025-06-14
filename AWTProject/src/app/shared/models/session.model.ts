import { Room } from './room.model';

export interface Session {
  id: string;
  datetime: string;
  Room: Room;
}
