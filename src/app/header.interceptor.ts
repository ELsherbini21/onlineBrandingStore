import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let headers: any = { token: localStorage.getItem('userToken') };
  let userToken: any = localStorage.getItem('userToken');

  let updatedRequest: any = req.clone({
    headers: req.headers.set('userToken', headers),
  });
  return next(updatedRequest);
};
