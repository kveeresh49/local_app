import { ActivatedRoute, ActivationStart, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'local_app';
  isAuthComonent = true;
  //data: {some_data: 'some value'}
  constructor(private router:  Router, private activateRoute: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.router);
    this.router.events.subscribe((res) => {
      if (res instanceof ActivationStart) {
        console.log(res.snapshot.data['isAuthComonent']);
        this.isAuthComonent = res.snapshot.data['isAuthComonent'];
      }
    });
  }
}
