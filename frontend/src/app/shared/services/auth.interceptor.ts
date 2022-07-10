import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public commonService: CommonService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {    
    if (this.commonService.getToken()) {
      const headers = {
        setHeaders: {
          Authorization: `${this.commonService.getToken()}`,
        },
      };
      request = request.clone({
        ...headers,
      }); 
    }
    return next.handle(request);
  }
}
