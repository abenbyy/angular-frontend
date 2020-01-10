import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/models/flight';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  flights : Flight[]
  departureHours: number[]
  arrivalHours : number[]
  departureMinutes: number[]
  arrivalMinutes : number[]

  test:number
  constructor(
    private searchService: SearchService,
  ) { 
    this.flights = new Array()
    this.departureHours = new Array()
    this.departureMinutes = new Array()
    this.arrivalHours = new Array()
    this.arrivalMinutes = new Array()
  }

  ngOnInit() {
    this.flights = []
    this.departureHours = []
    this.departureMinutes = []
    this.arrivalHours = []
    this.arrivalMinutes = []

    this.flights = this.searchService.flightsResult
    
    for(let i:number = 0;i<this.flights.length;i++){
      this.departureHours[i] = new Date(this.flights[i].departure).getHours()
      this.departureMinutes[i] = new Date(this.flights[i].departure).getMinutes()
      this.arrivalHours[i] = new Date(this.flights[i].arrival).getHours()
      this.arrivalMinutes[i] = new Date(this.flights[i].arrival).getMinutes()
    }

  }

  



}
