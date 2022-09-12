import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, config } from 'rxjs';
import { AuthService } from 'src/app/components/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = !!this.authService.currentUserValue
      ? this.authService.currentUserValue
      : this.cookieService.get('userToken')
      ? JSON.parse(this.cookieService.get('userToken'))
      : '';
    const isLoggedIn = currentUser && currentUser.token?.token;
    if (isLoggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token?.token}`,
        },
      });
    }
    return next.handle(request);
  }
}
