import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-banner',
  templateUrl: './carousel-banner.component.html',
  styleUrls: ['./carousel-banner.component.scss']
})
export class CarouselBannerComponent implements OnInit,AfterViewInit {
  slideIndex = 1;

  @Input() CarouselImages:any;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.activeSlide(this.slideIndex);
  }

  public slideChange(n:number): void {
    this.activeSlide(this.slideIndex += n);
  }
  
  public currentSlideIndicator(n:number): void {
    this.activeSlide(this.slideIndex = n);
  }
  
  private activeSlide(n:number): void {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {this.slideIndex = 1}    
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i]?.classList.add('none'); 
        slides[i]?.classList.remove('block'); 
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i]?.className.replace(' active', '');
    }
    slides[this.slideIndex-1]?.classList.add('block');
   let x =  dots[this.slideIndex-1]?.className 
   x+= ' active';
    slides[i]?.classList?.remove('none');
  }

}
