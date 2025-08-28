import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../services';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  setTimeout(() => loadingService.setLoading(true, req.url));

  return next(req).pipe(finalize(() => loadingService.setLoading(false, req.url)));
};
