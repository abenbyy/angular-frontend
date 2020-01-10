import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Trip } from 'src/app/models/trip';

@Component({
  selector: 'app-search-train',
  templateUrl: './search-train.component.html',
  styleUrls: ['./search-train.component.scss']
})
export class SearchTrainComponent implements OnInit {

  trips : Trip[]
  departureHours: number[]
  arrivalHours : number[]
  departureMinutes: number[]
  arrivalMinutes : number[]

  test:number
  constructor(
    private searchService: SearchService,
  ) { 
    this.trips = new Array()
    this.departureHours = new Array()
    this.departureMinutes = new Array()
    this.arrivalHours = new Array()
    this.arrivalMinutes = new Array()
  }

  ngOnInit() {
    this.trips = []
    this.departureHours = []
    this.departureMinutes = []
    this.arrivalHours = []
    this.arrivalMinutes = []

    this.trips = this.searchService.tripsResult
    
    for(let i:number = 0;i<this.trips.length;i++){
      this.departureHours[i] = new Date(this.trips[i].departure).getHours()
      this.departureMinutes[i] = new Date(this.trips[i].departure).getMinutes()
      this.arrivalHours[i] = new Date(this.trips[i].arrival).getHours()
      this.arrivalMinutes[i] = new Date(this.trips[i].arrival).getMinutes()
    }
  }
}
