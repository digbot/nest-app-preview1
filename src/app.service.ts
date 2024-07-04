import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getData(): Observable<string> {
    return of('Hello World').pipe(
      map((data) => data + ' - with RxJS'),
      catchError((err) => of(`Error: ${err}`)),
    );
  }
}
