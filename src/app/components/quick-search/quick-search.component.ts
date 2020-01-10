import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Airport } from 'src/app/models/airport';
import { Station } from 'src/app/models/station';
import { Subscription } from 'rxjs';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Flight } from 'src/app/models/flight';
import { Trip } from 'src/app/models/trip';


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
  
  constructor(
    private searchService : SearchService,
    private graphqlService : GraphqlService,
    private router : Router,
  ) { }
  
  changeSelected(idx){
    this.idx = idx;
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
          await console.log(this.airports)
        })
        break;
      case 2:
        this.station$ = this.graphqlService.getStations()
        .subscribe(async query =>{
          this.stations = query.data.stations
          await console.log(this.stations)
        })
        break;
    }
  }

  ngOnInit() {
    console.log(this.searchService.isSpecified)
    console.log(this.searchService.specIdx)

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

  search():void{
    switch(this.idx){
      case 0:
        this.flight$ = this.graphqlService.searchFlights(this.selectedFrom,this.selectedTo)
        .subscribe(async query =>{
          this.flights = query.data.searchflight
          await this.insertFlight()
        })
        break;
      case 2:
        this.trip$ = this.graphqlService.searchTrips(this.selectedFrom,this.selectedTo)
        .subscribe(async query =>{
          this.trips = query.data.searchtrip
          await this.insertTrip()
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

}
