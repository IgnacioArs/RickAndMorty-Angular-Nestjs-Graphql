import { ChangeDetectionStrategy, Component, inject,effect, signal } from '@angular/core';
import { PersonajeFavoritoService } from '../../services/personajeFavorito.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { PersonajeFavoritoInterface } from '../../interface/Personaje-Favorito-Interface';
import { PersonajeObservableService } from '../../services/personaje-observable.service';
import { PersonajeObservableInterface } from '../../interface/personajeObservable';


@Component({
  selector: 'app-favorito',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './favorito.component.html',
  styleUrl: './favorito.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritoComponent {
  
  private personajeService = inject(PersonajeFavoritoService);
  private storageService = inject(StorageService); // Inyectar el servicio
  private personajeObservableService = inject(PersonajeObservableService); // Inyectar el servicio PersobajeObservable

  personajeSeleccionadoObjectSignal = this.personajeService.personajeFavoritoSeleccionadoSignal;

  private router = inject(Router);
  
   arrayPersonajeFavorito: PersonajeFavoritoInterface[] = []; // Especificamos el tipo del array
   arrayPersistentePersonaje = signal<PersonajeFavoritoInterface[]>([]);
   personajeGuardadoObservable = {}  as PersonajeObservableInterface;

   constructor() {
    effect(() => {
      const personaje = this.personajeSeleccionadoObjectSignal();
      if (personaje) {
        console.log("Guardando personaje favorito:", personaje);
      }
      // Recuperamos los personajes favoritos guardados al cargar el componente
      this.arrayPersonajeFavorito = this.storageService.getFavoritosFromLocalStorage();
      this.arrayPersistentePersonaje.set(this.arrayPersonajeFavorito);
      console.log("Personajes favoritos al cargar la página:", this.arrayPersonajeFavorito);
    });
  }

  ngOnInit():any {
    this.personajeObservableService.getPersonajeObservable().subscribe((data)=>{
      console.log("datos de la pagina",data);
      this.personajeGuardadoObservable = data;
    })
  }

  hasValidData(): string {
    return (
      this.personajeGuardadoObservable.nombre &&
      this.personajeGuardadoObservable.especie &&
      this.personajeGuardadoObservable.genero &&
      this.personajeGuardadoObservable.estado
    );
  }



  irVolverSeleccionar() {
    this.router.navigate(['/header']);
  }

  irALista(){
    this.router.navigate(['/listado']);
  }
}


