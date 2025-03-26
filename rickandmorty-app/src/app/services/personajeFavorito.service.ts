import { Injectable, signal } from '@angular/core';
import { PersonajeFavoritoInterface } from '../interface/Personaje-Favorito-Interface';

@Injectable({
  providedIn: 'root',
})
export class PersonajeFavoritoService {
  personajeFavoritoSeleccionadoSignal = signal<PersonajeFavoritoInterface | null>(null);
}
