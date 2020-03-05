import { Component, OnInit } from '@angular/core';
import { Entertainment } from 'src/app/models/entertainment';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { GraphqlService } from 'src/app/services/graphql.service';
import L from 'leaflet';
import { OrderService } from 'src/app/services/order.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-entertainment-detail',
  templateUrl: './entertainment-detail.component.html',
  styleUrls: ['./entertainment-detail.component.scss']
})
export class EntertainmentDetailComponent implements OnInit {

  selectedEnt: Entertainment
  map: any
  marker: any
  slides: HTMLElement[]
  curr: any
  qtys: number[]
  showTickets
  totalPrice: number

  constructor(
    private router: Router,
    private searchService: SearchService,
    private graphqlService: GraphqlService,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    
    this.curr = 0
    this.selectedEnt = this.searchService.selectedEnt
    
    this.map = L.map('leaflet-map').setView([this.selectedEnt.latitude, this.selectedEnt.longitude], 14);
    this.qtys = new Array(this.selectedEnt.tickets.length).fill(0)
    this.showTickets = !this.selectedEnt.needdate

    
      this.slides = []
      
      var temp = document.querySelectorAll(".slides")
      console.log(temp)
      for(let i=0;i<temp.length;i++){
        this.slides.push(temp[i] as HTMLElement)
        this.slides[i].style.display = "none"
      }

      this.slides[0].style.display = "block"



    var iconDefault = L.divIcon({
      className: 'custom-div-icon',
      html: "<img src='../../../assets/icons/marker-icon.png'></img>",
      iconSize: [100, 42],
      iconAnchor: [15, 42]
    })
      
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.marker = L.marker([this.selectedEnt.latitude, this.selectedEnt.longitude],{icon: iconDefault}).addTo(this.map)


  }

  slideRight(){
    var prev = this.curr
    this.curr++
    
    if(this.curr > 5){
      this.curr = 0
    }

    this.slides[prev].style.display = "none"
    this.slides[this.curr].style.display = "block"
  }

  slideLeft(){
    var prev = this.curr
    this.curr--
    
    if(this.curr < 0){
      this.curr = 5
    }

    this.slides[prev].style.display = "none"
    this.slides[this.curr].style.display = "block"
  }

  onChange($event){
    this.totalPrice = 0
    for(let i=0;i<this.qtys.length;i++){
      this.totalPrice+= this.qtys[i] * this.selectedEnt.tickets[i].price
    }

    var el = document.getElementById("totalprice")
    el.innerText = "IDR "+this.totalPrice.toString()
  }

  goToOrder(){
    this.orderService.selectedEnt = this.selectedEnt
    this.orderService.ticketQtys = this.qtys
    
    this.router.navigate(['./orderentertainment'])
  }

  datePickerEvent(event: MatDatepickerInputEvent<Date>){
    this.showTickets = true

  }
}
