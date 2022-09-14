import { ActivatedRoute, ActivationStart, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, take, takeUntil } from 'rxjs';
import { AuthService } from './components/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'local_app';
  isAuthComonent = true;
  alerts: any = [];
  //data: {some_data: 'some value'}
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private authService: AuthService
  ) {}
  alertSubscription$: Subscription;
  ngOnInit() {
    this.alerts = [];
    this.alertSubscription$ = this.authService.isAlertMessage.subscribe(
      (data) => {
        this.alerts = [];
        this.alerts.push(data);
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
