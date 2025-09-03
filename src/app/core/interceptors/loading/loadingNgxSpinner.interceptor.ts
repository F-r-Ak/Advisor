import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

export const LoadingNgxSpinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const _spinner = inject(NgxSpinnerService);
  _spinner.show();
  return next(req).pipe(
    finalize(() => {
      _spinner.hide();
    })
  );
};
