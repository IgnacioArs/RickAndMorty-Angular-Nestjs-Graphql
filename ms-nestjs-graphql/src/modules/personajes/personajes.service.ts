// personajes.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axiosConfig from 'src/config/axios.config';
import { Personaje } from 'src/models/personaje.model';

@Injectable()
export class PersonajesService {
    constructor(
        private readonly configService: ConfigService,
    ) {}

    // Consumir la API REST para obtener personajes
    async obtenerPersonajes(): Promise<Personaje[]> {
        const apiUrl = this.configService.get<string>('api');
        const axiosInstance = axiosConfig(apiUrl);

        try {
            const response = await axiosInstance.get('/character');

            return response.data.results.map((personaje: any) => ({
                id: personaje.id,
                name: personaje.name,
                status: personaje.status,
                species: personaje.species,
                type: personaje.type || '',
                gender: personaje.gender,
                image: personaje.image,
                url: personaje.url,
                created: personaje.created,
                origin: {
                    name: personaje.origin?.name || 'Desconocido',
                    url: personaje.origin?.url || '',
                },
                location: {
                    name: personaje.location?.name || 'Desconocido',
                    url: personaje.location?.url || '',
                },
                episode: personaje.episode || [],
            }));
        } catch (error) {
            throw new Error(`Error al obtener personajes: ${error.message}`);
        }
    }

    async obtenerPersonajePorId(id: number): Promise<Personaje> {
        const apiUrl = this.configService.get<string>('api');
        const axiosInstance = axiosConfig(apiUrl);

        try {
            const response = await axiosInstance.get(`/character/${id}`);
            const personaje = response.data;

            return {
                id: personaje.id,
                name: personaje.name,
                status: personaje.status,
                species: personaje.species,
                type: personaje.type || '',
                gender: personaje.gender,
                image: personaje.image,
                url: personaje.url,
                created: personaje.created,
                origin: {
                    name: personaje.origin?.name || 'Desconocido',
                    url: personaje.origin?.url || '',
                },
                location: {
                    name: personaje.location?.name || 'Desconocido',
                    url: personaje.location?.url || '',
                },
                episode: personaje.episode || [],
            };
        } catch (error) {
            throw new Error(`Error al obtener el personaje con ID ${id}: ${error.message}`);
        }
    }

    async obtenerPersonajePorNombre(nombre: string): Promise<Personaje[]> {
        const apiUrl = this.configService.get<string>('api');
        const axiosInstance = axiosConfig(apiUrl);

        try {
            const response = await axiosInstance.get(`/character/?name=${nombre}`);
            const personaje = response.data.results;

            return personaje.map(personaje => ({
                id: personaje.id,
                name: personaje.name,
                status: personaje.status,
                species: personaje.species,
                type: personaje.type,
                gender: personaje.gender,
                image: personaje.image,
                url: personaje.url,
                created: personaje.created,
                origin: {
                    name: personaje.origin?.name,
                    url: personaje.origin?.url,
                },
                location: {
                    name: personaje.location?.name ,
                    url: personaje.location?.url,
                },
                episode: personaje.episode ,
            }));
            
        } catch (error) {
            throw new Error(`Error al obtener el personaje con NOMBRE ${nombre}: ${error.message}`);
        }
    }
}
    