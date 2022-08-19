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

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() sidebarShow: boolean = false;
  @Output() closeSidebar = new EventEmitter<boolean>();
  @Output() clickEvent = new EventEmitter<boolean>();
  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['sidebarShow'].currentValue);
    this.sidebarShow = changes['sidebarShow'].currentValue;
  }

  closeSideNav() {
    this.sidebarShow = false;
    this.closeSidebar.emit(this.sidebarShow);
  }

  logout() {
    this.cookieService.delete('userToken');
    this.sidebarShow = false;
    this.closeSidebar.emit(this.sidebarShow);
    this.clickEvent.emit(true);
    this.router.navigate(['./local-dashboard']);
  }
}
