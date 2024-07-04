import { Module, DynamicModule } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({})
export class DmoduleModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: DmoduleModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        DmoduleModule,
        LoggerService,
      ],
      exports: [LoggerService],
    };
  }
}
