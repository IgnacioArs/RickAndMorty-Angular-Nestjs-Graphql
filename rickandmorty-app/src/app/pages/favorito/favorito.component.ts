import { ChangeDetectionStrategy, Component, inject,effect, signal } from '@angular/core';
import { PersonajeFavoritoService } from '../../services/personajeFavorito.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { PersonajeFavoritoInterface } from '../../interface/Personaje-Favorito-Interface';

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

  personajeSeleccionadoObjectSignal = this.personajeService.personajeFavoritoSeleccionadoSignal;

  private router = inject(Router);
  
   arrayPersonajeFavorito: PersonajeFavoritoInterface[] = []; // Especificamos el tipo del array
   arrayPersistentePersonaje = signal<PersonajeFavoritoInterface[]>([]);
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

  irVolverSeleccionar() {
    this.router.navigate(['/header']);
  }

  irALista(){
    this.router.navigate(['/listado']);
  }
}


