import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel-image-slider',
  templateUrl: './hotel-image-slider.component.html',
  styleUrls: ['./hotel-image-slider.component.scss']
})
export class HotelImageSliderComponent implements OnInit {

  constructor() { }
  
  slides: HTMLElement[]
  curr:number
  prev:number

  ngOnInit() {

    this.curr=0
    this.prev = 0
    var temp = document.querySelectorAll(".slides")
    this.slides = []
    for(let i=0;i<temp.length;i++){
      this.slides.push(temp[i] as HTMLElement) 
    }

  }

  slideLeft():void{
    this.prev = this.curr
      this.curr--
      //console.log(prev) 
      //console.log(curr) 

      if(this.curr < 0){
        this.curr= this.slides.length-1
      }
      this.slides[this.prev].style.display = "none"
      this.slides[this.curr].style.display = "block"
  }
  slideRight():void{
    this.prev = this.curr
    this.curr++
    //console.log(prev) 
    //console.log(curr) 

    if(this.curr > this.slides.length-1){
      this.curr=0
    }
    this.slides[this.prev].style.display = "none"
    this.slides[this.curr].style.display = "block"
  }

}
