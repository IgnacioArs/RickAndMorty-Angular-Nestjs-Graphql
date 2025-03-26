import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject,signal } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { PersonajeFavoritoInterface } from '../../interface/Personaje-Favorito-Interface';



@Component({
  selector: 'app-lista',
  imports: [NgFor,CommonModule],
  standalone: true,
  templateUrl: './lista.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class ListaComponent {
  private storageService = inject(StorageService); 
  arrayPersonajeFavorito: PersonajeFavoritoInterface[] = []; // Especificamos el tipo del array

  arrayPersistentePersonaje = signal<PersonajeFavoritoInterface[]>([]);
  constructor() {
    effect(() => {


      // Recuperamos los personajes favoritos guardados al cargar el componente
      this.arrayPersonajeFavorito = this.storageService.getFavoritosFromLocalStorage();
      console.log("Personajes favoritos al cargar la página:", this.arrayPersonajeFavorito);
      this.arrayPersistentePersonaje.set(this.arrayPersonajeFavorito);
    
    });
  }

}