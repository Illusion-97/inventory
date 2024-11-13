import {ApplicationConfig, inject, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpInterceptorFn, provideHttpClient, withInterceptors} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AuthService} from '../auth/auth.service';
import {catchError, throwError} from 'rxjs';

const backendInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url
  if(url.startsWith('/')) req = req.clone({url: environment.API_URL + url});
  return next(req)
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      backendInterceptor,
      (req, next) => {
        const auth: AuthService = inject(AuthService)
        if(auth.token && req.url.startsWith(environment.API_URL)) req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${auth.token}`
          }
        })
        return next(req).pipe(catchError(err => {
          if(err.status == 401) auth.logout()
          return throwError(() => err)
        }))
      }
    ]))
  ]
};

