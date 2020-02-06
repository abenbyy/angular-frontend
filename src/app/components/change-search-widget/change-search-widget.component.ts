import { Component, OnInit, Input, Inject } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Airport } from 'src/app/models/airport';
import { MatDialog , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, SearchResultComponent } from '../search-result/search-result.component';
import { Flight } from 'src/app/models/flight';
import { Subscription } from 'rxjs';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-search-widget',
  templateUrl: './change-search-widget.component.html',
  styleUrls: ['./change-search-widget.component.scss'],
})
export class ChangeSearchWidgetComponent implements OnInit {
  @Input() type:string
  airports: Airport[]
  flights: Flight[]
  flight$: Subscription
  selectedFrom: string
  selectedTo: string
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private searchService: SearchService,
    private graphqlService: GraphqlService,
    //public searchResult: SearchResultComponent,
    private router : Router,
    public dialog : MatDialog,
  ) { }
    
  ngOnInit() {
    this.airports = this.searchService.airports
  }

  changeSearch():void{
    if(this.data.type === "flight"){
      this.flight$ = this.graphqlService.searchFlights(this.selectedFrom, this.selectedTo)
      .subscribe(async query=>{
        this.flights = query.data.searchflight
        await this.insertFlight()
      })
    }
  }

  insertFlight(){
    
    this.searchService.flightsResult = this.flights
    this.searchService.selectedFlightFrom = this.selectedFrom
    this.searchService.selectedFlightTo = this.selectedTo
    this.dialog.closeAll()
    

  }
}
