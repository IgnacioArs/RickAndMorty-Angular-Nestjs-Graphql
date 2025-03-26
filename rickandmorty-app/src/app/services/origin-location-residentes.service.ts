import { inject, Injectable} from '@angular/core';
import { axiosInstance } from '../config/axios.config';
import { PersonajeInterface } from '../interface/Personaje-Interface';
import { getIdFromUrl } from '../utils/transform-id';
import { RickAndMortyService } from './rickandmorty.service';

@Injectable({
  providedIn: 'root',
})
export class OriginLocationService {

   serviceRickAndMortyByName = inject(RickAndMortyService);

  async transFormMethod(personaje:PersonajeInterface):Promise<PersonajeInterface>{
    const origenId = getIdFromUrl(personaje.origin.url);
    const origenPersonaje = await this.obtenerOriginPorId(origenId || 0);

    if (!origenPersonaje) {
        console.error(`No se encontró origen con ID: ${origenId}`);
        return personaje;
    }

    const idResidents = origenPersonaje.residents?.length ? getIdFromUrl(origenPersonaje.residents[0]) : null;
    if (!idResidents) {
        console.error(`No hay residentes en el origen con ID: ${origenId}`);
        return personaje;
    }

    const residenteEncontrado = await this.serviceRickAndMortyByName.obtenerPersonajePorID(idResidents);
    personaje.Origen = {
        name: origenPersonaje.name,
        residente: residenteEncontrado?.name || 'Desconocido',
    };

    // Manejo seguro de Localización
    const locaLizacionId = getIdFromUrl(personaje.location.url);
    const localizacionPersonaje = await this.obtenerOriginPorId(locaLizacionId || 0);

    if (!localizacionPersonaje) {
        console.error(`No se encontró localización con ID: ${locaLizacionId}`);
        return personaje;
    }

    const locaLizacionIdResidente = localizacionPersonaje.residents?.length ? getIdFromUrl(localizacionPersonaje.residents[0]) : null;
    const residenteEncontradoLocalizacion = locaLizacionIdResidente
        ? await this.serviceRickAndMortyByName.obtenerPersonajePorID(locaLizacionIdResidente)
        : null;

    personaje.Localizacion = {
        name: localizacionPersonaje.name,
        residente: residenteEncontradoLocalizacion?.name || 'Desconocido',
    };

    // Manejo seguro de Episodio
    const idEpisodio = getIdFromUrl(personaje.episode[0]);
    const episodio = await this.obtenerEpisodioPorId(idEpisodio || 0);

    if (!episodio) {
        console.error(`No se encontró episodio con ID: ${idEpisodio}`);
        return personaje;
    }

    personaje.Episodio = {
        name: episodio.name,
        episodio: episodio.episode,
    };

    return personaje;
  }

  
  async obtenerOriginPorId(idOrigin: number) {
    if (!idOrigin) {
        console.error("No se encontró origen con ID:", idOrigin);
        return null;
    }

    try {
        const response = await axiosInstance.post('', {
            query: `
                query ObtenerOrigenPorId($obtenerOrigenPorIdId: Int!) {
                    obtenerOrigenPorId(id: $obtenerOrigenPorIdId) {
                        id
                        name
                        type
                        dimension
                        residents
                        url
                        created
                    }
                }
            `,
            variables: { obtenerOrigenPorIdId: idOrigin }
        });

      

        if (!response.data?.data?.obtenerOrigenPorId) {
            console.warn("La API no devolvió datos válidos. Respuesta:", response.data);
            return null;
        }

        return response.data.data.obtenerOrigenPorId;  

    } catch (error) {
        console.error("Error al obtener origin por ID:", error);
        return null;
    }
}




  async obtenerEpisodioPorId(idEpisodio: number) {
    if (!idEpisodio) {
      console.error("No se encontró episodio con ID:", idEpisodio);
      return null;
  }
    try {
      const response = await axiosInstance.post('', {
        query: `
          query ObtenerEpisodioPorId($obtenerEpisodioPorIdId: Int!) {
              obtenerEpisodioPorId(id: $obtenerEpisodioPorIdId) {
                id
                name
                air_date
                episode
                characters
                url
                created
              }
            }
        `,
        variables: {
          obtenerEpisodioPorIdId: idEpisodio, // Aquí corregimos el nombre de la variable
        }
      });

      if (!response.data?.data?.obtenerEpisodioPorId) {
        console.warn("La API no devolvió datos válidos. Respuesta:", response.data);
        return null;
    }

    return response.data.data.obtenerEpisodioPorId;
     
    } catch (error) {
      console.error("Error al obtener obtenerEpisodioPorId por ID:", error);
      return null;  // Manejo seguro del error
    }
  }
}

