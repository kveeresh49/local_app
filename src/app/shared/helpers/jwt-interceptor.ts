import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, config } from 'rxjs';
import { AuthService } from 'src/app/components/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUserValue;
     const isLoggedIn = currentUser && currentUser.token && currentUser.token.token;
    if (isLoggedIn) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser.token?.token}`
            }
        });
    }
    return next.handle(request);
  }
}
