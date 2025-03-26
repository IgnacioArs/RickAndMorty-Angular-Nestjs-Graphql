import { Module } from '@nestjs/common';
import { PersonajesResolver } from './personajes.resolver';
import { PersonajesService } from './personajes.service';


@Module({
  providers: [PersonajesResolver, PersonajesService]
})
export class PersonajesModule {}
