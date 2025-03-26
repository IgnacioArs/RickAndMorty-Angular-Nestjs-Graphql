import { Module } from '@nestjs/common';
import { OrigenResolver } from './origen.resolver';
import { OrigenService } from './origen.service';

@Module({
  providers: [OrigenResolver, OrigenService]
})
export class OrigenModule {}
