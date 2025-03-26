import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axiosConfig from 'src/config/axios.config';
import { Origen } from 'src/models/origen.model';

@Injectable()
export class OrigenService {
    constructor(
        private readonly configService: ConfigService,
    ) {}

        async obtenerOriginPorId(id: number): Promise<Origen> {
            const apiUrl = this.configService.get<string>('api');
            const axiosInstance = axiosConfig(apiUrl);
    
            try {
                const response = await axiosInstance.get(`/location/${id}`);
                const origen = response.data;
                return {
                       id: origen.id,
                       name: origen.name,
                       type: origen.type,
                       dimension:origen.dimension,
                       residents: origen.residents,
                       url: origen.url,
                       created: origen.created
                };
            } catch (error) {
                throw new Error(`Error al obtener el origen con ID ${id}: ${error.message}`);
            }
        }
}
