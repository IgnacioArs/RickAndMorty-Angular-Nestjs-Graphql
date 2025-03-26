import { Module } from '@nestjs/common';
import { EpisodiosResolver } from './episodios.resolver';
import { EpisodiosService } from './episodios.service';

@Module({
  providers: [EpisodiosResolver, EpisodiosService]
})
export class EpisodiosModule {}
