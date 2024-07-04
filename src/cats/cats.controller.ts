import { Controller, Get, Param, Req } from '@nestjs/common';
import { CatsService } from './cats.service';
import { LoggerService } from '../dmodule/logger.service';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  getCats(@Req() request: Request): string[] {
    request.session.visits = request.session.visits
      ? request.session.visits + 1
      : 1;
    const logItem = this.loggerService.writeCount(request.session.visits);
    return this.catsService.getCats(logItem);
  }

  @Get(':name')
  getCatByName(@Param('name') name: string): string {
    if (name.toLowerCase() === 'garfield') {
      return 'You found Garfield! Congratulations! 🎉';
    }
    return `Meow! Here's ${name}, your cute cat.`;
  }
}
