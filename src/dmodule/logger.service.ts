import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class LoggerService {
  constructor(@Inject('CONFIG_OPTIONS') private options: Record<string, any>) {
    this.options = options;
  }

  writeCount(count: number): string {
    const result = (this.options.prefix + ': ' + count) as string;

    console.warn(result);

    return result;
  }
}
