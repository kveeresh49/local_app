import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {
  slideIndex = 1;
  startingIndex = 0;
  endingIndex = 6;
  constructor() { }

  ngOnInit(): void {
    this.showSlides(this.slideIndex);
  }


  cards = [
    {
      title: "Medical store",
      productImg: "../../../assets/images/shop-categories/medical.png",
      storeType: 'medical'
    },
    {
      title: "Grocery Stores",
      productImg: "../../../assets/images/shop-categories/grocery.png",
      storeType: 'grocery'
    },
    {
      title: "Liquor Stores",
      productImg: "../../../assets/images/shop-categories/liquor.png",
      storeType: 'liquor'
    },
    {
      title: "Fruits & Vegetables",
      productImg: "../../../assets/images/shop-categories/fruits-vegetables.png",
      storeType: 'vegetables'
    },
    {
      title: "From the Farms (FPO’s)",
      productImg: "../../../assets/images/shop-categories/farms.png",
      storeType: 'farms'
    },
    {
      title: "Terrace Gardens",
      productImg: "../../../assets/images/shop-categories/terrace-garden.png",
      storeType: 'garden'
    },
    {
      title: "Terrace Gardens",
      productImg: "../../../assets/images/shop-categories/terrace-garden.png",
      storeType: 'garden'
    },
    {
      title: "Fruits & Vegetables",
      productImg: "../../../assets/images/shop-categories/fruits-vegetables.png",
      storeType: 'vegetables'
    },
  ]

  highlightCard = [
    {
      titel:"Abhijeeth Wines",
      varietiesInShops:"",
      varietiesInShopsTitel:"",
      DiscountInShops:"",
      highlightBackgroundColor:"",
    }
  ] 

 

 plusSlides(n:any) {
  this.showSlides(this.slideIndex += n);
}

 currentSlide(n:any) {
  this.showSlides(this.slideIndex = n);
}

 showSlides(n:any) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {this.slideIndex = 1}    
  if (n < 1) {this.slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].classList.add('none'); 
      slides[i].classList.remove('block'); 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[this.slideIndex-1].classList.add('block');
  dots[this.slideIndex-1].className += ' active';
  slides[i].classList.remove('none');
}

storeScroll(type:string) {
  if (type === "next") {
    this.startingIndex = this.startingIndex + 6;
    this.endingIndex = this.endingIndex + 6;
  }
  if (type === "prev") {
    this.startingIndex = this.startingIndex - 6;
    this.endingIndex = this.endingIndex - 6;
  }
}

}
