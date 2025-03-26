// storage.service.ts
import { Injectable } from '@angular/core';
import { PersonajeFavoritoInterface } from '../interface/Personaje-Favorito-Interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  private localStorageKey = 'favoritos'; // Nombre clave para almacenar en localStorage

  // Método para obtener los personajes favoritos del localStorage
  getFavoritosFromLocalStorage(): PersonajeFavoritoInterface[] {
    const favoritos = localStorage.getItem(this.localStorageKey);
    return favoritos ? JSON.parse(favoritos) : [];
  }

  // Método para guardar los personajes favoritos en localStorage
  saveFavoritosToLocalStorage(favoritos: PersonajeFavoritoInterface[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(favoritos));
  }

  // Método para combinar los personajes favoritos actuales con los del localStorage
  updateFavoritos(favoritos: PersonajeFavoritoInterface[]): PersonajeFavoritoInterface[] {
    const favoritosGuardados = this.getFavoritosFromLocalStorage();
    const nuevosFavoritos = [...favoritosGuardados, ...favoritos];
    return this.removeDuplicados(nuevosFavoritos);
  }

  // Eliminar duplicados basados en el 'id' del personaje
  private removeDuplicados(favoritos: PersonajeFavoritoInterface[]): PersonajeFavoritoInterface[] {
    return favoritos.filter((valor, index, self) => 
      index === self.findIndex((t) => (
        t.id === valor.id
      ))
    );
  }
}
