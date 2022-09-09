import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit, OnChanges {
  @Input() category: any;
  selectedCategory: number;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.category = changes['category'].currentValue;
  }

  onCategoryClick(): void {
    this.selectedCategory = this.category.id;
  }
}
