import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-homepage-slider',
  templateUrl: './homepage-slider.component.html',
  styleUrls: ['./homepage-slider.component.scss']
})


export class HomepageSliderComponent implements OnInit {
  
  constructor() { 
  }
  slides: HTMLElement[]
  curr:number
  prev:number
  autoSlideInterval: any
  ngOnInit() {
    
    //var curr = 0
    //var prev = 0
    this.curr = 0
    this.prev = 0
    var temp = document.querySelectorAll(".slides")
    this.slides = []
    for(let i=0;i<temp.length;i++){
      this.slides.push(temp[i] as HTMLElement) 
    }
    //console.log(slides)
    this.autoSlideInterval = setInterval(function(){
      this.prev = this.curr
      this.curr++
      //console.log(prev) 
      //console.log(curr) 

      if(this.curr > 4){
        this.curr=0
      }
      this.slides[this.prev].style.display = "none"
      this.slides[this.curr].style.display = "block"
    }.bind(this),3000)
    //this.getLocation()
    
  }

  slideLeft():void{
    this.prev = this.curr
      this.curr--
      //console.log(prev) 
      //console.log(curr) 

      if(this.curr < 0){
        this.curr=4
      }
      this.slides[this.prev].style.display = "none"
      this.slides[this.curr].style.display = "block"
  }
  slideRight():void{
    this.prev = this.curr
    this.curr++
    //console.log(prev) 
    //console.log(curr) 

    if(this.curr > 4){
      this.curr=0
    }
    this.slides[this.prev].style.display = "none"
    this.slides[this.curr].style.display = "block"
  }

  getLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          console.log(longitude)
          console.log(latitude)
          window.open("https://www.google.com/maps/@"+latitude+","+longitude)
        });
    } else {
       console.log("No support for geolocation")
    }
  }
}
