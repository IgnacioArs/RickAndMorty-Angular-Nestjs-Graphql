import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { PersonajesService } from './personajes.service';
import { Personaje } from 'src/models/personaje.model';

@Resolver()
export class PersonajesResolver {
    constructor(private readonly personajesService: PersonajesService) {}
  
    @Query(() => [Personaje], { description: 'Endpoint para obtener todos los personajes', name: 'obtenerTodosLosPersonajes' })
    async personajes(): Promise<Personaje[]> {
        return this.personajesService.obtenerPersonajes();
    }

    @Query(() => Personaje, { description: 'Endpoint para obtener un personaje por ID', name: 'obtenerPersonajePorId' })
    async personajePorId(@Args('id', { type: () => Int }) id: number): Promise<Personaje> {
        return this.personajesService.obtenerPersonajePorId(id);
    }

    @Query(() => [Personaje], { description: 'Endpoint para obtener todos los personajes por NOMBRE', name: 'obtenerTodosLosPersonajesPorNombre' })
    async personajePorNombre(@Args('nombre', { type: () => String }) nombre: string): Promise<Personaje[]> {
        return this.personajesService.obtenerPersonajePorNombre(nombre);
    }


}
