import { Injectable } from '@angular/core';
import { Flight } from '../models/flight';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  isSpecified: boolean
  specIdx: number
  flightsResult: Flight[]
  tripsResult: Trip[]

  constructor() { 
    this.isSpecified = false
    this.specIdx = -1
  }


}
