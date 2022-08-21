import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() CategoryCardComponent: any;

  constructor() { }

  ngOnInit(): void {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
  }

}
