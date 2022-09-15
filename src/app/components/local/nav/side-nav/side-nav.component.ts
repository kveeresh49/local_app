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
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/components/auth/auth.service';
import { CommonService } from 'src/app/shared/common-service';
import { AlertModelObj } from 'src/app/shared/models/alert.model';

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
  userImage: string;
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.isLoginUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.sidebarShow = changes['sidebarShow'].currentValue;
    this.userProfileVerification();
  }

  private userProfileVerification(): void {
    let id: string = JSON.parse(this.cookieService.get('userToken')).token.id;
    if(id) {
      this.spinner.show();
      this.authService.getUserProfile$(id).subscribe({
        next: (userProfile: any) => {
          this.cookieService.set('userProfile', JSON.stringify(userProfile));
          setTimeout(() => {
            this.userProfile = userProfile;
          });
          //this.setProfileDetails();
          this.spinner.hide();
        },
        error: (error) => {
          this.spinner.hide();
          let errorMessage = 'Failed to load profile details';
          let alert: AlertModelObj = new AlertModelObj('danger', errorMessage);
          this.commonService.alertMessageSub$.next(alert);
        },
      });
    }
   
  }

  closeSideNav() :void{
    this.sidebarShow = false;
    this.closeSidebar.emit(this.sidebarShow);
  }

  isLoginUser() :void{
    this.authService.isloggedInUser.subscribe(
      (value) => (this.isLoginUserFlag = value)
    );
    if (
      this.cookieService.get('userToken') !== null &&
      this.cookieService.get('userToken') !== ''
    ) {
      this.isLoginUserFlag = true;
    this.userProfileVerification();
    } else {
      this.isLoginUserFlag = false;
    }
  }

  navigateLogin():void {
    this.router.navigate(['/login']);
  }

  logout():void {
    this.cookieService.delete('userToken');
    this.authService.isloggedInUser.next(false);
    this.authService.loginUserDetailSub$.next(null);
    this.sidebarShow = false;
    this.closeSidebar.emit(this.sidebarShow);
    this.clickEvent.emit(true);
    this.router.navigate(['/dashboard']);
    let alert: AlertModelObj = new AlertModelObj(
      'success',
      `Logout Successful!`
    );
  }
}
