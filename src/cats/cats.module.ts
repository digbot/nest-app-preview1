import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { DmoduleModule } from '../dmodule/dmodule.module';

@Module({
  imports: [
    // AT run-time, we'll need to first bind the options object to the Nest IoC container, 
    // and then have Nest inject it into our DmoduleModule
    DmoduleModule.register({
      prefix: '_DYNAMIC_CONFIG_PREFIX_',
    }),
  ],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
