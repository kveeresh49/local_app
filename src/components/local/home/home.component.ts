import { Component, Input, OnInit } from '@angular/core';
import { CategoryCardComponent } from 'src/shared/components/category-card/category-card.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() CategoryCardComponent: any;

  constructor() { }

  ngOnInit(): void {
  }

}
