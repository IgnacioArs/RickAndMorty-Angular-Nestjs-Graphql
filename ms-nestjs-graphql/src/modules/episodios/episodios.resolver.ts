import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { EpisodiosService } from './episodios.service';
import { Episodio } from 'src/models/episodio.model';

@Resolver()
export class EpisodiosResolver {

        
    constructor(private readonly episodiosService: EpisodiosService) {}
    
    @Query(() => Episodio, { description: 'Endpoint para obtener un episodio por ID', name: 'obtenerEpisodioPorId' })
    async obtenerOriginPorId(@Args('id', { type: () => Int }) id: number): Promise<Episodio> {
                return this.episodiosService.obtenerEpisodioPorId(id);
    }
}
