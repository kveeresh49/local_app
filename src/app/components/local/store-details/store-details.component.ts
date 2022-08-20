import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss'],
})
export class StoreDetailsComponent implements OnInit {
  @ViewChild('storeDetails', { static: true }) storeDetailsRef: ElementRef;
  selectedCategoryId = 1;
  selectedStoreNavId = 1;
  cart: any[] = [];
  cartTotal = 0;

  public categories = [
    {
      id: 1,
      name: 'Fresh Vegetables',
    },
    {
      id: 2,
      name: 'Fresh Fruits',
    },
    {
      id: 3,
      name: 'Organic Vegetables',
    },
    {
      id: 4,
      name: 'Herbs & Seasonals',
    },
  ];

  public storeNavItems = [
    {
      id: 1,
      name: 'Order Online',
    },
    {
      id: 2,
      name: 'Info',
    },
    {
      id: 3,
      name: 'Reviews',
    },
    {
      id: 4,
      name: 'Coupons',
    },
  ];

  public products = [
    {
      id: 1,
      name: 'Coriander',
      quantity: '250 gms',
      price: 27,
      oldPrice: 30,
      image: '../../../assets/images/store-images/Coriander.png',
      discount: 15,
      count: 0,
    },
    {
      id: 2,
      name: 'Cauliflower',
      quantity: '1 Piece',
      price: 48,
      image: '../../../assets/images/store-images/Cauliflower.png',
      count: 0,
    },
    {
      id: 3,
      name: 'French beans',
      quantity: '500 gms',
      price: 18,
      oldPrice: 20,
      image: '../../../assets/images/store-images/French beans.png',
      count: 0,
      discount: 10,
    },
    {
      id: 4,
      name: 'Carrot',
      quantity: '500 gms',
      price: 26,
      oldPrice: 30,
      image: '../../../assets/images/store-images/Carrot.png',
      discount: 10,
      count: 0,
    },
    {
      id: 5,
      name: 'Tomato',
      quantity: '500 gms',
      price: 7.5,
      image: '../../../assets/images/store-images/Tomato.png',
      count: 0,
    },
    {
      id: 6,
      name: 'Onions',
      quantity: '1 kg',
      price: 36,
      image: '../../../assets/images/store-images/Onions.png',
      count: 0,
    },
  ];

  constructor() {}

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.transformStoreDetails();
    });
  }

  public onSelectCategory(categoryId: number): void {
    this.selectedCategoryId = categoryId;
  }

  public onSelectNavItem(navId: number): void {
    this.selectedStoreNavId = navId;
  }

  public updateCount(id: number, onIncrement: boolean): void {
    let product = this.products.find((product) => product.id === id);
    if (product) {
      product.count = onIncrement ? product.count + 1 : product.count - 1;
    }
    this.updateCart();
  }

  private transformStoreDetails(): void {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      this.storeDetailsRef.nativeElement.style.transform = 'scaleY(.55)';
    } else {
      this.storeDetailsRef.nativeElement.style.transform = 'scaleY(1)';
    }
  }

  private updateCart(): void {
    this.cart = this.products.filter((product) => product.count > 0);
    this.cartTotal = this.cart.reduce((a, b) => {
      return a + b.price;
    }, 0);
  }
}
