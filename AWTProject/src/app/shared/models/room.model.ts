import { Seat } from "./seat.model";
import { Session } from "./session.model";

export interface Room {
  id: string;             // UUID de la sala
  name: string;           // Nombre de la sala, ej. "Sala 1", "IMAX", etc.
  seatMap: any;           // Puede ser un array, objeto, string, depende de cómo lo implementes

  // Opcionalmente puedes añadir esto si haces fetch ampliado:
  screenings?: Session[]; // Proyecciones en esa sala, si decides cargarlas
}