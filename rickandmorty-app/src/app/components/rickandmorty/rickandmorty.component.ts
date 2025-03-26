import { ChangeDetectionStrategy, Component, effect, inject, Input, signal } from '@angular/core';
import { PersonajeFavoritoInterface } from '../../interface/Personaje-Favorito-Interface';
import { PersonajeFavoritoService } from '../../services/personajeFavorito.service';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
 // Importa StorageService

@Component({
  selector: 'rickandmorty-component',
  imports: [CommonModule],
  templateUrl: './rickandmorty.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RickAndMortyComponent {
  private store = inject(Store<{ app: AppState }>);
  private storageService = inject(StorageService); // Inyectar el servicio

  @Input() personajeFavoritoSeleccionadoObjectSignal: PersonajeFavoritoInterface | null = null;
  @Input() Titulo: string = '';

  private personajeService = inject(PersonajeFavoritoService);
  personajeSeleccionadoObjectSignal = this.personajeService.personajeFavoritoSeleccionadoSignal;

  arrayPersonajeFavorito: PersonajeFavoritoInterface[] = []; // Especificamos el tipo del array

  arrayPersistentePersonaje = signal<PersonajeFavoritoInterface[]>([]);

  constructor() {
    effect(() => {
      const personaje = this.personajeSeleccionadoObjectSignal();
      if (personaje) {
        this.Titulo = "Info Personaje Favorito Seleccionado Comunicación Component";
        console.log("Guardando personaje favorito:", personaje);
      }

      // Recuperamos los personajes favoritos guardados al cargar el componente
      this.arrayPersonajeFavorito = this.storageService.getFavoritosFromLocalStorage();
      console.log("Personajes favoritos al cargar la página:", this.arrayPersonajeFavorito);

      this.store.select((state) => state.app.data).subscribe((data) => {
        console.log('Nuevo estado en Favorito:', data);

        if (data != null) {
          // Asegúrate de agregar el personaje al array sin duplicados
          if (!this.arrayPersonajeFavorito.some(p => p.id === data.id)) {
            this.arrayPersonajeFavorito = [...this.arrayPersonajeFavorito, data];
          }
          console.log("Así se ve el array", this.arrayPersonajeFavorito);
          this.arrayPersistentePersonaje.set(this.arrayPersonajeFavorito);
          // Actualizamos el localStorage con el nuevo array
          this.storageService.saveFavoritosToLocalStorage(this.arrayPersonajeFavorito);
        }
      });
    });
  }
}

