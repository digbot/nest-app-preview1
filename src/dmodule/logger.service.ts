import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class LoggerService {
  constructor(@Inject('CONFIG_OPTIONS') private options: Record<string, any>) {
    this.options = options;
  }

  writeCount(count: number): string {
    //Type assertion in TypeScript is a way to explicitly tell the compiler about the type of a value.
    //It's similar to type casting in other languages, but it doesn't perform any runtime type checking or conversion.
    //Instead, it instructs the compiler to treat a value as a specified type, helping with type checking and code completion during development.
    const result = (this.options.prefix + ': ' + count) as string;

    console.warn(result);

    return result;
  }
}
