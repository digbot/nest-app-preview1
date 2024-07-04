import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { DmoduleModule } from '../dmodule/dmodule.module';

@Module({
  imports: [
    DmoduleModule.register({
      prefix: '_DYNAMIC_CONFIG_PREFIX_',
    }),
  ],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
