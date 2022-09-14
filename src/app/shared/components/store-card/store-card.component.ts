import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.scss'],
})
export class StoreCardComponent implements OnInit {
  @Input() nearByStoreData: any;
  favoriteIconColor = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  favoriteIconClick() {
    this.favoriteIconColor = !this.favoriteIconColor;
  }

  onCardClick(): void {
    this.router.navigate(['/store']);
  }
}
