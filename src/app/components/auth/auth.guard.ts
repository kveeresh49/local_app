import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(next);
    console.log(state);
    return true;
//     if (sessionStorage.getItem('token')) {
//         this.router.navigate(['/local-dashboard']);
//       return true;
//     }
//     //this.router.navigate(['/login']);
//     return false;

//   }
}
}
