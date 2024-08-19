import { HttpInterceptorFn } from '@angular/common/http';

export const headInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
