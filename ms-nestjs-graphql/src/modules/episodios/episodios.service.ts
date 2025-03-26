import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axiosConfig from 'src/config/axios.config';
import { Episodio } from 'src/models/episodio.model';

@Injectable()
export class EpisodiosService {
        constructor(
            private readonly configService: ConfigService,
        ) {}

        async obtenerEpisodioPorId(id: number): Promise<Episodio> {
            const apiUrl = this.configService.get<string>('api');
            const axiosInstance = axiosConfig(apiUrl);
    
            try {
                const response = await axiosInstance.get(`/episode/${id}`);
                const episodios = response.data;
                return {
                    id:episodios.id,
                    name:episodios.name,
                    air_date:episodios.air_date,
                    episode:episodios.episode,
                    characters:episodios.characters,
                    url:episodios.url,
                    created:episodios.created,
                };
            } catch (error) {
                throw new Error(`Error al obtener el episodio con ID ${id}: ${error.message}`);
            }
        }
}
