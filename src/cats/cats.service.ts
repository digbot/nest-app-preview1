import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  getCats(logItem: string): string[] {
    return [logItem, 'Siamese', 'Persian', 'Maine Coon', 'Sphynx'];
  }
}
