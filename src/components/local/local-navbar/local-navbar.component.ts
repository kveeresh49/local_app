import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-local-navbar',
  templateUrl: './local-navbar.component.html',
  styleUrls: ['./local-navbar.component.scss']
})
export class LocalNavbarComponent implements OnInit {
  public sidebarShow: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
