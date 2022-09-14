import { ActivatedRoute, ActivationStart, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, take, takeUntil } from 'rxjs';
import { AuthService } from './components/auth/auth.service';
import { CommonService } from './shared/common-service';
import { AlertModelObj } from './shared/models/alert.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'local_app';
  isAuthComonent = true;
  public alert: Array<AlertModelObj> = [];
  constructor(
    private router: Router,
    private commonService:CommonService
  ) {}
  alertSubscription$: Subscription;
  ngOnInit() {
    this.alertSubscription$ = this.commonService.alertMessageSub$.subscribe(
      (data) => {
        this.alert = [];
        this.alert.push(data);
      }
    );
    this.router.events.subscribe((res) => {
      if (res instanceof ActivationStart) {
        this.isAuthComonent = res.snapshot.data['isAuthComonent'];
      }
    });
  }

  ngOnDestroy(): void {
  this.alertSubscription$.unsubscribe();
  }
}
