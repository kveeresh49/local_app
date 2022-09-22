import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Injectable({ providedIn: 'root' })
export class RedirectToLogin implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      this.cookieService.get('userToken') == null ||
      this.cookieService.get('userToken') == ''
    ) {
      this.router.navigate(['login']);
    }
    return true;
  }
}
