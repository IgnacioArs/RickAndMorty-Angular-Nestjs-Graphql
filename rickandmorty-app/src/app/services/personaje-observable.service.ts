import { Injectable } from '@angular/core';
import { PersonajeObservableInterface, initPersobajeObservable } from '../interface/personajeObservable';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PersonajeObservableService {

  // Crea el BehaviorSubject con los valores iniciales correctos
  private personajeObservable = new BehaviorSubject<PersonajeObservableInterface>(initPersobajeObservable);

  // Método para obtener el observable
  getPersonajeObservable(): Observable<PersonajeObservableInterface> {
    return this.personajeObservable.asObservable();
  }

  // Método para actualizar el estado del personaje
  updatePersonajeObservable(personaje: PersonajeObservableInterface){
    this.personajeObservable.next(personaje);
  }

}