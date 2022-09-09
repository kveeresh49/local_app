import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/components/auth/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() sidebarShow: boolean = false;
  @Output() closeSidebar = new EventEmitter<boolean>();
  @Output() clickEvent = new EventEmitter<boolean>();
  isLoginUserFlag: boolean = false;
  userProfile: any;
  constructor(private cookieService: CookieService, private router: Router, private authService : AuthService) {}

  ngOnInit(): void {
    this.isLoginUser();
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.sidebarShow = changes['sidebarShow'].currentValue;
    if(this.cookieService.get('userProfile') !== '' && this.cookieService.get('userProfile') !== null){
      this.userProfile = JSON.parse(this.cookieService.get('userProfile'));
    }
  }

  closeSideNav() {
    this.sidebarShow = false;
    this.closeSidebar.emit(this.sidebarShow);
  }

  isLoginUser() {
    this.authService.isloggedInUser.subscribe(value => this.isLoginUserFlag = value);
    if (
      this.cookieService.get('userToken') !== null &&
      this.cookieService.get('userToken') !== ''
    ) {
      this.isLoginUserFlag = true;
    } else {
      this.isLoginUserFlag = false;
    }
  }






  navigateLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.cookieService.delete('userToken');
    this.authService.isloggedInUser.next(false);
    this.authService.loginUserDetailSub$.next(null);
    this.sidebarShow = false;
    this.closeSidebar.emit(this.sidebarShow);
    this.clickEvent.emit(true);
    this.router.navigate(['/dashboard']);
  }
}
