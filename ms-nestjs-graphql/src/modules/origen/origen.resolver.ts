import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Origen } from 'src/models/origen.model';
import { OrigenService } from './origen.service';

@Resolver()
export class OrigenResolver {
    
        constructor(private readonly origenService: OrigenService) {}

        @Query(() => Origen, { description: 'Endpoint para obtener un origen por ID', name: 'obtenerOrigenPorId' })
        async obtenerOriginPorId(@Args('id', { type: () => Int }) id: number): Promise<Origen> {
            return this.origenService.obtenerOriginPorId(id);
        }
}
