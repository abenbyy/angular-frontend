import { Injectable } from '@angular/core';
import { Flight } from '../models/flight';
import { Trip } from '../models/trip';
import { Hotel } from '../models/hotel';
import { GraphqlService } from './graphql.service';
import { Subscription } from 'rxjs';
import { Airport } from '../models/airport';
import { Car } from '../models/car';

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

  constructor(
    graphqlService : GraphqlService,
  ) { 
    this.isSpecified = false
    this.specIdx = -1
    this.selectedFlightFrom = ""
    this.selectedFlightTo = ""
  }



}
