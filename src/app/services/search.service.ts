import { Injectable } from '@angular/core';
import { Flight } from '../models/flight';
import { Trip } from '../models/trip';
import { Hotel } from '../models/hotel';
import { GraphqlService } from './graphql.service';
import { Subscription } from 'rxjs';
import { Airport } from '../models/airport';
import { Car } from '../models/car';
import { Entertainment } from '../models/entertainment';
import { Blog } from '../models/blog';
import { History } from '../models/history';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  isSpecified: boolean
  specIdx: number
  airports: Airport[]
  flightsResult: Flight[]
  hotelResult: Hotel[]
  carResult: Car[]
  tripsResult: Trip[]
  selectedFlightFrom : string
  selectedFlightTo : string
  selectedHotelCity: string

  selectedCarCity: string
  selectedCar: Car
  selectedHotel: Hotel
  selectedEnt : Entertainment
  selectedBlog: Blog
  
  selectedType

  searchHistory: History[]
  constructor(
    graphqlService : GraphqlService,
  ) { 
    this.isSpecified = false
    this.specIdx = -1
    this.selectedFlightFrom = ""
    this.selectedFlightTo = ""
    this.searchHistory = []
  }

  deleteHistory(){
    this.searchHistory = []
  }

  getHistory(req){
    var hist = []
    this.searchHistory.forEach((val)=>{
      if(val.type === req){
        hist.push(val)
      }
    })
    return hist
  }

  



}
