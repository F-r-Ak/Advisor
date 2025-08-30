import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor(private router: Router, private modal: MatDialog) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          // 401 errors are most likely going to be because we have an expired token that we need to refresh.
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
          this.modal.closeAll();
          this.router.navigateByUrl('/');
        }else{
        // if (error && error.status === 403) {
        //   localStorage.removeItem('token');
        //   localStorage.removeItem('userData');
        //   this.modal.closeAll();
        //   this.router.navigateByUrl('/notfound');
        // }
        }

        return throwError(error);
      })
    );
  }
}
