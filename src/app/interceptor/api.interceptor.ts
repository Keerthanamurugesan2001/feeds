import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../core/services/api/user.service';
import { catchError, filter, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
    constructor(private authService: UserService, private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const authToken = this.authService.getToken();
        const baseURL = 'https://8167-14-98-32-198.ngrok-free.app/api/v1/'
        const noAuthRequired = [
            'auth/login',
            'auth/register'
        ]
        if (authToken) {
            if (noAuthRequired.includes(req.url)) {
                const Req = req.clone({
                    url: baseURL + req.url,
                })
                return next.handle(Req);
            }
            const Req = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${authToken}`),
                url: baseURL + req.url,
            });
            return next.handle(Req).pipe(
                catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                  this.authService.removeToken()
                }
                return throwError(error);
              })
              );
        } else {
            const Req = req.clone({
                url: baseURL + req.url,
            })
            return next.handle(Req);
        }
    }
}