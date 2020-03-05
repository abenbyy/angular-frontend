import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Trip } from 'src/app/models/trip';
import { Subscription } from 'rxjs';
import { Station } from 'src/app/models/station';
import { GraphqlService } from 'src/app/services/graphql.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangeSearchWidgetComponent } from '../change-search-widget/change-search-widget.component';

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

  station$: Subscription
  stations: Station[]

  trip$: Subscription
  checkBool: boolean[]
  test:number
  constructor(
    private searchService: SearchService,
    private graphqlService: GraphqlService,
    private dialog: MatDialog,
  ) { 
    this.trips = new Array()
    this.departureHours = new Array()
    this.departureMinutes = new Array()
    this.arrivalHours = new Array()
    this.arrivalMinutes = new Array()
    this.checkBool = new Array(20).fill(false)
  }

  ngOnInit() {
    this.trips = []
    this.departureHours = []
    this.departureMinutes = []
    this.arrivalHours = []
    this.arrivalMinutes = []

    this.trips = this.searchService.tripsResult
    
    this.station$ = this.graphqlService.getStations()
    .subscribe(async query =>{
      this.stations = query.data.stations
      
    })

    for(let i:number = 0;i<this.trips.length;i++){
      this.departureHours[i] = new Date(this.trips[i].departure).getHours()
      this.departureMinutes[i] = new Date(this.trips[i].departure).getMinutes()
      this.arrivalHours[i] = new Date(this.trips[i].arrival).getHours()
      this.arrivalMinutes[i] = new Date(this.trips[i].arrival).getMinutes()
    }
  }

  resetFilter(){
    for(let i=0;i< this.checkBool.length;i++){
      this.checkBool[i]= false
    }
  }

  openModal(){
    this.dialog.open(ChangeSearchWidgetComponent,{
      data:{
        type: 'train'
      },
      height: 'fit-content',
      width: '100vw'
      
    })
    this.dialog.afterAllClosed.subscribe(
      ()=>{
        this.reFetchData()
        
      }
    )
  }

  reFetchData(){
    this.trips = []
    
    
    this.trips = this.searchService.tripsResult

    this.departureHours = []
    this.departureMinutes = []
    this.arrivalHours = []
    this.arrivalMinutes = []
    
    for(let i:number = 0;i<this.trips.length;i++){
      this.departureHours[i] = new Date(this.trips[i].departure).getHours()
      this.departureMinutes[i] = new Date(this.trips[i].departure).getMinutes()
      this.arrivalHours[i] = new Date(this.trips[i].arrival).getHours()
      this.arrivalMinutes[i] = new Date(this.trips[i].arrival).getMinutes()
    }
  }
}
