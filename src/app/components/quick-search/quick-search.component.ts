import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Airport } from 'src/app/models/airport';
import { Station } from 'src/app/models/station';
import { Subscription } from 'rxjs';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Flight } from 'src/app/models/flight';
import { Trip } from 'src/app/models/trip';
import { Hotel } from 'src/app/models/hotel';
import { async } from '@angular/core/testing';
import { History } from 'src/app/models/history';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../history/history.component';


@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.scss']
})
export class QuickSearchComponent implements OnInit {
  descriptions:string[]=["Find Cheap Flight Ticket Price","Cheap Online Hotel Booking Promo","Reservation And Book Online Train Ticket","Find Cheap Car Rentals Deals Here","Your Unforgettable Experience Starts Here"];
  icons:string[] = ["plane","hotel","trains","carrent","entertainment"];
  types:string[] = ["FLIGHT","HOTEL","TRAIN","CAR","ENTERTAINMENT"];
  message:string;
  type:string;
  icon:string;
  idx;

  airport$: Subscription
  airports: Airport[]

  station$: Subscription
  stations: Station[]

  selectedFrom: string
  selectedTo  : string

  selectedCity: string

  cities = [{
    value: "Jakarta",
    display: "Jakarta, Indonesia",
  }]
  
  imgIcons: HTMLElement[]
  constructor(
    private searchService : SearchService,
    private graphqlService : GraphqlService,
    private router : Router,
    private dialog: MatDialog,
  ) { }
  
  changeSelected(idx){
    this.imgIcons[this.idx].style.borderWidth= "2px"
    this.imgIcons[this.idx].style.borderColor= "#58627a"
    this.idx = idx;
    this.imgIcons[this.idx].style.borderWidth= "2.5px"
    this.imgIcons[this.idx].style.borderColor= "#0064d2"
    this.message = this.descriptions[this.idx];
    this.icon = this.icons[this.idx];
    this.type=this.types[this.idx];
    this.checkIndex();
  }

  checkIndex(){
    switch(this.idx){
      case 0:
        this.airport$ = this.graphqlService.getAirports()
        .subscribe(async query => {
          this.airports = query.data.airports
          this.searchService.airports = this.airports
        })
        break;
      case 2:
        this.station$ = this.graphqlService.getStations()
        .subscribe(async query =>{
          this.stations = query.data.stations
          
        })
        break;
    }
  }

  ngOnInit() {
    var temp
    window.onload = function(){
      var temp = document.querySelectorAll(".img-container")
      this.imgIcons = []
      
      for(let i=0;i<temp.length;i++){
        this.imgIcons.push(temp[i] as HTMLElement)
      }

      this.imgIcons[0].style.borderWidth= "2.5px"
      this.imgIcons[0].style.borderColor= "#0064d2"
    }.bind(this)
    if(this.router.url === "/"){
      this.searchService.isSpecified = false
    }
    if(this.searchService.isSpecified === true){
      this.idx = this.searchService.specIdx
    }else{
      this.idx = 0;
      
    }
    this.message = this.descriptions[this.idx];
    this.icon = this.icons[this.idx];
    this.type=this.types[this.idx];
    
    this.checkIndex();
    
  }

  ngOnDestroy(){
    //this.airport$.unsubscribe()
    //this.flight$.unsubscribe()
    //this.trip$.unsubscribe()
    //this.station$.unsubscribe()
  }
  flight$ : Subscription
  flights : Flight[]

  trip$ : Subscription
  trips : Trip[]

  hotel$: Subscription

  car$: Subscription
  
  search():void{
    
    switch(this.idx){
      case 0:
        var hist = new History()
        hist.type = "Flight"
        hist.fieldOne = this.selectedFrom
        hist.fieldTwo = this.selectedTo
        this.searchService.searchHistory.push(hist)
        this.flight$ = this.graphqlService.searchFlights(this.selectedFrom,this.selectedTo)
        .subscribe(async query =>{
          this.flights = query.data.searchflight
          this.searchService.selectedFlightFrom = this.selectedFrom
          this.searchService.selectedFlightTo = this.selectedTo
          await this.insertFlight()
          
        })
        break;

      case 1:
        var hist = new History()
        hist.type = "Hotel"
        hist.fieldOne = this.selectedCity
        hist.fieldTwo = ""
        this.searchService.searchHistory.push(hist)
          this.hotel$ = this.graphqlService.searchHotels(this.selectedCity)
          .subscribe(async query=>{
            this.searchService.hotelResult = query.data.searchhotel
            this.searchService.selectedHotelCity = this.selectedCity
            await this.router.navigate(['./searchhotel'])
          })

        break;

      case 2:
        var hist = new History()
        hist.type = "Train"
        hist.fieldOne = this.selectedFrom
        hist.fieldTwo = this.selectedTo
        this.searchService.searchHistory.push(hist)
        this.trip$ = this.graphqlService.searchTrips(this.selectedFrom,this.selectedTo)
        .subscribe(async query =>{
          this.trips = query.data.searchtrip
          this.searchService.selectedFlightFrom = this.selectedFrom
          this.searchService.selectedFlightTo = this.selectedTo
          await this.insertTrip()
        })
        break;

      case 3:
        var hist = new History()
        hist.type = "Car"
        hist.fieldOne = this.selectedCity
        hist.fieldTwo = ""
        this.searchService.searchHistory.push(hist)
        this.car$ = this.graphqlService.searchCars(this.selectedCity)
        .subscribe(async query=>{
          this.searchService.carResult = query.data.searchcar
          this.searchService.selectedCarCity = this.selectedCity
          await this.router.navigate(["./searchcar"])
        })
    }
      

  }

  insertFlight(){
    this.searchService.flightsResult = this.flights
    this.router.navigate(['./searchresult'])
  }

  insertTrip(){
    this.searchService.tripsResult = this.trips
    console.log(this.trips)
    this.router.navigate(['./searchtrip'])
  }

  goToEntertainment(){
    this.router.navigate(["./entertainments"])
  }

  openHistory(){
    this.dialog.open(HistoryComponent,{
      width: '30vw',
      height:'95vh'
    })
  }

  highlight(){
    var el = document.getElementById("main-quicksearch")
    el.style.backgroundColor= "rgba(0,0,0,0.5)"
    
  }
}
