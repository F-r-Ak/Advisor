import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../../../core';
import { environment } from '../../../../environments/environment';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // if (request.url.includes(environment.HOST_API)) {
      if (request.url.includes(environment.HOST_API)) {
      this.loadingService.setLoading(true, request.url);

      return next.handle(request).pipe(finalize(() => this.loadingService.setLoading(false, request.url)));
    }

    return next.handle(request);
  }
}
