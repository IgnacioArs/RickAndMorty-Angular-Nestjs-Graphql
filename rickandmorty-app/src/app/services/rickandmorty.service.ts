import { Injectable, signal } from '@angular/core';
import { PersonajeFavoritoInterface } from '../interface/Personaje-Favorito-Interface';
import { axiosInstance } from '../config/axios.config';
import { } from '../querys/query-personajes';
import { PersonajeInterface } from '../interface/Personaje-Interface';


@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {


  arrayPersistentePersonaje = signal<PersonajeInterface[]>([]);
  async obtenerTodosLosPersonajesQuery() {
    try {
      const response = await axiosInstance.post('', {
        query: `
          query {
            obtenerTodosLosPersonajes {
              id
              name
              status
              species
              type
              gender
              image
              url
              created
              origin {
                name
                url
              }
              location {
                name
                url
              }
              episode
            }
          }
        `
      });

  
      
      this.arrayPersistentePersonaje.set(response.data.data.obtenerTodosLosPersonajes);

    if (!response.data?.data?.obtenerTodosLosPersonajes) {
        console.warn("La API no devolvió datos válidos. Respuesta:", response.data);
        return null;
    }
    return response.data.data.obtenerTodosLosPersonajes;

    } catch (error) {
      console.error("Error al obtener personajes:", error);
      return [];
    }
  }


  async obtenerPersonajePorID(idPersonaje: number) {
    if (!idPersonaje) {
      console.error("No se encontró personaje con ID:", idPersonaje);
      return null;
  }
    try {
      const response = await axiosInstance.post('', {
        query: `
          query ObtenerPersonajePorId($id: Int!) {
            obtenerPersonajePorId(id: $id) {
              id
              name
              status
              species
              type
              gender
              image
              url
              created
              origin {
                name
                url
              }
              location {
                name
                url
              }
              episode
            }
          }
        `,
        variables: {
          id: idPersonaje, 
        }
      });
  
      if (!response.data?.data?.obtenerPersonajePorId) {
        console.warn("La API no devolvió datos válidos. Respuesta:", response.data);
        return null;
    }
    return response.data.data.obtenerPersonajePorId;

    } catch (error) {
      console.error("Error al obtener personaje por ID:", error);
      return null;  // Mejor devolver `null` en caso de error
    }
  }



  async obtenerPersonajePorNombre(nombre: string) {
    if (!nombre) {
      console.error("No se encontró personaje con NOMBRE:", nombre);
      return null;
  }
    try {
      const response = await axiosInstance.post('', {
        query: `
          query ObtenerTodosLosPersonajesPorNombre($nombre: String!) {
            obtenerTodosLosPersonajesPorNombre(nombre: $nombre) {
              id
              name
              status
              species
              type
              gender
              image
              url
              created
              origin {
                name
                url
              }
              location {
                name
                url
              }
              episode
            }
          }
        `,
        variables: {
          nombre: nombre, 
        }
      });

      if (!response.data?.data?.obtenerTodosLosPersonajesPorNombre) {
        console.warn("La API no devolvió datos válidos. Respuesta:", response.data);
        return null;
    }
    return response.data.data.obtenerTodosLosPersonajesPorNombre;

    } catch (error) {
      console.error("Error al obtener personaje por nombre:", error);
      return null;  // Mejor devolver `null` en caso de error
    }
  }
  



    obtenerTodosLosPersonajes(){
         const  personajesArray = [
          {
            "id": 1,
            "name": "Rick Sanchez",
            "status": "Alive",
            "species": "Human",
            "type": "",
            "gender": "Male",
            "origin": {
              "name": "Earth (C-137)",
              "url": "https://rickandmortyapi.com/api/location/1"
            },
            "location": {
              "name": "Citadel of Ricks",
              "url": "https://rickandmortyapi.com/api/location/3"
            },
            "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            "episode": [
              "https://rickandmortyapi.com/api/episode/1",
              "https://rickandmortyapi.com/api/episode/2",
              "https://rickandmortyapi.com/api/episode/3",
              "https://rickandmortyapi.com/api/episode/4",
              "https://rickandmortyapi.com/api/episode/5",
              "https://rickandmortyapi.com/api/episode/6",
              "https://rickandmortyapi.com/api/episode/7",
              "https://rickandmortyapi.com/api/episode/8",
              "https://rickandmortyapi.com/api/episode/9",
              "https://rickandmortyapi.com/api/episode/10",
              "https://rickandmortyapi.com/api/episode/11",
              "https://rickandmortyapi.com/api/episode/12",
              "https://rickandmortyapi.com/api/episode/13",
              "https://rickandmortyapi.com/api/episode/14",
              "https://rickandmortyapi.com/api/episode/15",
              "https://rickandmortyapi.com/api/episode/16",
              "https://rickandmortyapi.com/api/episode/17",
              "https://rickandmortyapi.com/api/episode/18",
              "https://rickandmortyapi.com/api/episode/19",
              "https://rickandmortyapi.com/api/episode/20",
              "https://rickandmortyapi.com/api/episode/21",
              "https://rickandmortyapi.com/api/episode/22",
              "https://rickandmortyapi.com/api/episode/23",
              "https://rickandmortyapi.com/api/episode/24",
              "https://rickandmortyapi.com/api/episode/25",
              "https://rickandmortyapi.com/api/episode/26",
              "https://rickandmortyapi.com/api/episode/27",
              "https://rickandmortyapi.com/api/episode/28",
              "https://rickandmortyapi.com/api/episode/29",
              "https://rickandmortyapi.com/api/episode/30",
              "https://rickandmortyapi.com/api/episode/31",
              "https://rickandmortyapi.com/api/episode/32",
              "https://rickandmortyapi.com/api/episode/33",
              "https://rickandmortyapi.com/api/episode/34",
              "https://rickandmortyapi.com/api/episode/35",
              "https://rickandmortyapi.com/api/episode/36",
              "https://rickandmortyapi.com/api/episode/37",
              "https://rickandmortyapi.com/api/episode/38",
              "https://rickandmortyapi.com/api/episode/39",
              "https://rickandmortyapi.com/api/episode/40",
              "https://rickandmortyapi.com/api/episode/41",
              "https://rickandmortyapi.com/api/episode/42",
              "https://rickandmortyapi.com/api/episode/43",
              "https://rickandmortyapi.com/api/episode/44",
              "https://rickandmortyapi.com/api/episode/45",
              "https://rickandmortyapi.com/api/episode/46",
              "https://rickandmortyapi.com/api/episode/47",
              "https://rickandmortyapi.com/api/episode/48",
              "https://rickandmortyapi.com/api/episode/49",
              "https://rickandmortyapi.com/api/episode/50",
              "https://rickandmortyapi.com/api/episode/51"
            ],
            "url": "https://rickandmortyapi.com/api/character/1",
            "created": "2017-11-04T18:48:46.250Z"
          },
          ]
        
          return personajesArray;
    }

    mantenerPersonajeFavorito(personaje:PersonajeFavoritoInterface){
        return personaje;
    }

}