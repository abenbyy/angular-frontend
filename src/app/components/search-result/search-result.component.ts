import { Component, OnInit, Inject } from '@angular/core';
import { Flight } from 'src/app/models/flight';
import { FlightFilter } from 'src/app/models/flightfilter';
import { SearchService } from 'src/app/services/search.service';
import { Subscription, interval } from 'rxjs';
import { GraphqlService } from 'src/app/services/graphql.service';
import { async } from '@angular/core/testing';
import { Airport } from 'src/app/models/airport';
import { MatDialog } from '@angular/material/dialog';
import { ChangeSearchWidgetComponent } from '../change-search-widget/change-search-widget.component';
//import { DOCUMENT } from '@angular/common';

export interface DialogData{
  type: 'flight'|'train'|'hotel';
}
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  selectedFrom : string
  selectedTo : string
  
  flights : Flight[]
  displayedFlights : Flight[]
  filter: FlightFilter;
  departureHours: number[]
  arrivalHours : number[]
  departureMinutes: number[]
  arrivalMinutes : number[]
  flight$: Subscription
  detailsBool : number[]
  priceBool : number[]
  scrollIdx: number
  flightFacilities: string[]
  checkBool: boolean[]
  

  constructor(
 //   @Inject(DOCUMENT) private document: Document,
    private searchService: SearchService,
    private graphqlService: GraphqlService,
    public dialog : MatDialog,
  ) { 
    this.flights = new Array()
    this.departureHours = new Array()
    this.departureMinutes = new Array()
    this.arrivalHours = new Array()
    this.arrivalMinutes = new Array()
    this.filter = new FlightFilter()
    this.flights = []
    this.flight$ = new Subscription()
    this.detailsBool = new Array(100).fill(0)
    this.priceBool = new Array(100).fill(0)
    this.scrollIdx = 0
    this.displayedFlights = []
    this.flightFacilities = new Array()
    this.checkBool = new Array(20).fill(false)
    this.filter.hours = 0
    
  }


  ngOnInit() {


    this.filter.airlines = []
    this.filter.facilities = []
    this.filter.departurehours = []
    this.filter.arrivalhours = []
    this.filter.hours = 0
    this.flights = []
    this.flights = this.searchService.flightsResult
    this.selectedFrom = this.searchService.selectedFlightFrom
    this.selectedTo = this.searchService.selectedFlightTo
    this.sliceData()
    this.resetData()
    document.onscroll = function(){
      if(window.scrollY + window.innerHeight >= document.body.scrollHeight){
        this.scrollIdx++
        this.sliceData()
        
      }
    }.bind(this)
    
  }

  reFetchData(){
    this.filter.facilities = []
    this.filter.airlines = []
    this.filter.departurehours = []
    this.filter.arrivalhours = []
    this.filter.hours = 0
    this.flights = []
    this.displayedFlights = []
    
    
    this.flights = this.searchService.flightsResult
    this.selectedFrom = this.searchService.selectedFlightFrom
    this.selectedTo = this.searchService.selectedFlightTo
    this.sliceData()
  }
  tempSlice: Flight[]

  // changeSearch():void{
  //   this.flights = []
  //   this.displayedFlights = []
  //   this.flight$.unsubscribe()
  //   this.flight$ = this.graphqlService.searchFlights(this.selectedFrom, this.selectedTo)
  //   .subscribe(async query=>{
  //     this.flights = query.data.searchflight
  //     await this.sliceData()
  //   })
  
  // }

  sliceData(){
    // console.log(this.displayedFlights)
    //alert(this.flights[0].facilities[0].name.match("%Baggage%"))
    //console.log(this.flights.slice(this.scrollIdx*5,this.scrollIdx*5+5))
    this.tempSlice = []
    this.tempSlice = this.flights.slice(this.scrollIdx*5,this.scrollIdx*5+5)
    // for(let i in this.tempSlice){
    //   this.displayedFlights.push(this.tempSlice[i])
    // }
    this.displayedFlights.push(...this.tempSlice)
    //this.displayedFlights.push(this.flights.slice(this.scrollIdx*5,this.scrollIdx*5+5))
    
    this.resetData()
  }

  filterDuration (event){
    this.filter.hours = event.value

    this.flight$ = this.graphqlService.filterFlights(this.filter)
     .subscribe(async query =>{
      
      this.flights = query.data.filterflights
      this.displayedFlights = []
      await this.sliceData()
      //await this.resetData()
      
    })

  }

  formatLabel(value:number){
    return value+'h';
  }
  resetData():void{
    this.flightFacilities = []
    this.departureHours = []
    this.departureMinutes = []
    this.arrivalHours = []
    this.arrivalMinutes = []
    
    for(let i:number = 0;i<this.displayedFlights.length;i++){
      
      this.departureHours[i] = new Date(this.displayedFlights[i].departure).getHours()
      this.departureMinutes[i] = new Date(this.displayedFlights[i].departure).getMinutes()
      this.arrivalHours[i] = new Date(this.displayedFlights[i].arrival).getHours()
      this.arrivalMinutes[i] = new Date(this.displayedFlights[i].arrival).getMinutes()
      if(this.displayedFlights[i].facilities.length>0){
        this.flightFacilities[i]=""
        for(let j:number = 0; j<this.displayedFlights[i].facilities.length;j++){
          
          //console.log(this.displayedFlights[i].facilities[j].name)
          this.flightFacilities[i]= this.flightFacilities[i].concat(this.displayedFlights[i].facilities[j].name)
          
          //console.log("NAME: "+this.flightFacilities[i])
        }
      }else{
        this.flightFacilities[i]=""
        continue
      }
    }
    //alert(this.flightFacilities[0][0])
    //alert(this.flightFacilities[0].includes("Baggage"))
  }

  filterAirline(value:String){
    //console.log(this.filter.airlines.indexOf(value))
    this.scrollIdx = 0  
    this.flights = []
    //this.flight$.unsubscribe()
    
    if(this.filter.airlines.indexOf(value) == -1){
      this.filter.airlines.push(value)
      
      this.flight$ = this.graphqlService.filterFlights(this.filter)
      .subscribe(async query =>{
        
        this.flights = query.data.filterflights
        this.displayedFlights = []
        await this.sliceData()
        //await this.resetData()
        
      })

      //console.log(this.flights)
      // this.resetData() 
      
    }
    else{
      const idx = this.filter.airlines.indexOf(value,0)
      this.filter.airlines.splice(idx,1)
      this.displayedFlights = []

      this.flight$ = this.graphqlService.filterFlights(this.filter)
      .subscribe(async query =>{
        this.flights = query.data.filterflights
        
        this.sliceData()
        //await this.resetData()
        
      })
    }
  }

  filterFacility(val:string):void{
    this.scrollIdx = 0  
    this.flights = []
    this.displayedFlights = []
    //this.flight$.unsubscribe()
    
    if(this.filter.facilities.indexOf(val) == -1){
    
      this.filter.facilities.push(val)
      
      this.flight$ = this.graphqlService.filterFlights(this.filter)
      .subscribe(async query =>{
        
        this.flights = query.data.filterflights
        
        await this.sliceData()
        //await this.resetData()
        
      })

      //console.log(this.flights)
      // this.resetData() 
      
    }
    else{
      const idx = this.filter.facilities.indexOf(val,0)
      this.filter.facilities.splice(idx,1)

      this.flight$ = this.graphqlService.filterFlights(this.filter)
      .subscribe(async query =>{
        this.flights = query.data.filterflights
        
        this.sliceData()
        //await this.resetData()
        
      })
    }
    
  }

  filterDeparture(val:number):void{
    this.scrollIdx = 0  
    this.flights = []
    this.displayedFlights = []
    //this.flight$.unsubscribe()
    
    
    if(!this.filter.departurehours.find(el => el == val)){
      
      this.filter.departurehours.push(val)
      alert(this.filter.departurehours)
      this.flight$ = this.graphqlService.filterFlights(this.filter)
      .subscribe(async query =>{
        
        this.flights = query.data.filterflights
        await this.sliceData()
        //await this.resetData()
        
      })

      //console.log(this.flights)
      // this.resetData()      
    }
    else{
      const idx = this.filter.departurehours.findIndex(el => el == val)
      this.filter.departurehours.splice(idx,1)

      this.flight$ = this.graphqlService.filterFlights(this.filter)
      .subscribe(async query =>{
        this.flights = query.data.filterflights
        
        this.sliceData()
        //await this.resetData()
        
      })
    }
    
  }

  filterArrival(val:number):void{
    this.scrollIdx = 0  
    this.flights = []
    this.displayedFlights = []
    //this.flight$.unsubscribe()
    
    if(!this.filter.arrivalhours.find(el => el == val)){
    
      this.filter.arrivalhours.push(val)
      
      this.flight$ = this.graphqlService.filterFlights(this.filter)
      .subscribe(async query =>{
        
        this.flights = query.data.filterflights
        
        await this.sliceData()
        //await this.resetData()
        
      })

      //console.log(this.flights)
      // this.resetData()      
    }
    else{
      const idx = this.filter.arrivalhours.findIndex(el => el == val)
      this.filter.arrivalhours.splice(idx,1)

      this.flight$ = this.graphqlService.filterFlights(this.filter)
      .subscribe(async query =>{
        this.flights = query.data.filterflights
        
        this.sliceData()
        //await this.resetData()
        
      })
    }
    
  }

  resetFilter():void{
    
    for(let i=0;i<this.checkBool.length;i++){
      this.checkBool[i] = false
    }
    this.displayedFlights=[]
    this.filter.airlines = []
    this.filter.facilities = []
    this.filter.departurehours = []
    this.filter.arrivalhours = []
    this.filter.hours = 0
    this.flights = []
    this.flight$.unsubscribe()
    this.flight$ = this.graphqlService.searchFlights(this.searchService.selectedFlightFrom, this.searchService.selectedFlightTo)
    .subscribe(async query=>{
      this.flights = query.data.searchflight
      await this.sliceData()
      
    })

    
  }

  toggleDetail(val:number):void{
    var temp = document.querySelectorAll(".current-detail-content")[val] as HTMLElement
    if(this.detailsBool[val]===0){
      temp.style.display = "block"
      this.detailsBool[val] = 1
    }else{
      temp.style.display = "none"
      this.detailsBool[val] = 0
    }
    
  }
  togglePrice(val:number):void{
    var temp = document.querySelectorAll(".current-price-content")[val] as HTMLElement
    if(this.priceBool[val]===0){
      temp.style.display = "block"
      this.priceBool[val] = 1
    }else{
      temp.style.display = "none"
      this.priceBool[val] = 0
    }
  }

  openModal():void{
    this.dialog.open(ChangeSearchWidgetComponent,{
      data:{
        type: 'flight'
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

  sortByLowestPrice():void{
    alert("asd")
    this.scrollIdx = 0
    this.displayedFlights = []

    for(let i=0;i<this.flights.length-1;i++){
      for(let j=0;j< this.flights.length-i-1;j++){
        if(this.flights[j].price > this.flights[j+1].price){
          var temp = this.flights[j]
          this.flights[j] = this.flights[j+1]
          this.flights[j+1] = temp
        }
      }
    }

    this.sliceData();
  }
  sortByShortestDuration():void{
    this.scrollIdx = 0
    this.displayedFlights = []
    for(let i=0;i<this.flights.length-1;i++){
      for(let j=0;j< this.flights.length-i-1;j++){
        if(this.flights[j].duration > this.flights[j+1].duration){
          var temp = this.flights[j]
          this.flights[j] = this.flights[j+1]
          this.flights[j+1] = temp
        }
      }
    }
    this.sliceData()
  }

  //new Date(this.displayedFlights[i].departure).getHours()
  sortByEarliestDeparture():void{
    this.scrollIdx = 0
    this.displayedFlights = []
    for(let i=0;i<this.flights.length-1;i++){
      for(let j=0;j< this.flights.length-i-1;j++){
        var a = new Date(this.flights[j].departure).getHours()
        var b = new Date(this.flights[j+1].departure).getHours()
        if(a > b){
          var temp = this.flights[j]
          this.flights[j] = this.flights[j+1]
          this.flights[j+1] = temp
        }
      }
    }

    this.sliceData()
  }

  sortByLatestDeparture():void{
    this.scrollIdx = 0
    this.displayedFlights = []

    for(let i=0;i<this.flights.length-1;i++){
      for(let j=0;j< this.flights.length-i-1;j++){
        var a = new Date(this.flights[j].departure).getHours()
        var b = new Date(this.flights[j+1].departure).getHours()
        if(a < b){
          var temp = this.flights[j]
          this.flights[j] = this.flights[j+1]
          this.flights[j+1] = temp
        }
      }
    }
    
    this.sliceData()
  }

  sortByEarliestArrival():void{
    this.scrollIdx = 0
    this.displayedFlights = []

    for(let i=0;i<this.flights.length-1;i++){
      for(let j=0;j< this.flights.length-i-1;j++){
        var a = new Date(this.flights[j].arrival).getHours()
        var b = new Date(this.flights[j+1].arrival).getHours()
        if(a > b){
          var temp = this.flights[j]
          this.flights[j] = this.flights[j+1]
          this.flights[j+1] = temp
        }
      }
    }
    
    this.sliceData()
  }

  sortByLatestArrival():void{
    this.scrollIdx = 0
    this.displayedFlights = []

    for(let i=0;i<this.flights.length-1;i++){
      for(let j=0;j< this.flights.length-i-1;j++){
        var a = new Date(this.flights[j].arrival).getHours()
        var b = new Date(this.flights[j+1].arrival).getHours()
        if(a < b){
          var temp = this.flights[j]
          this.flights[j] = this.flights[j+1]
          this.flights[j+1] = temp
        }
      }
    }
    
    this.sliceData()
  }
}
