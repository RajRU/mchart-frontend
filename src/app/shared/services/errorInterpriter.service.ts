import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retryWhen, tap } from 'rxjs/operators';

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
  constructor() {}
  retryCount = 0;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.retryCount = 0;
    return next.handle(req).pipe(
      retryWhen((errors) =>
        errors.pipe(
          tap((error) => {
            if (error.status !== 0) {
              throw error;
            }
            // this.retryCoun;
          })
        )
      )
    );
  }
}
