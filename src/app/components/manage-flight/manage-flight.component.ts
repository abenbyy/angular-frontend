import { Component, OnInit } from '@angular/core';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { IfStmt } from '@angular/compiler';
import { Subscription } from 'rxjs';
import { Flight } from 'src/app/models/flight';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';

@Component({
  selector: 'app-manage-flight',
  templateUrl: './manage-flight.component.html',
  styleUrls: ['./manage-flight.component.scss']
})
export class ManageFlightComponent implements OnInit {

  constructor(
    private graphqlService: GraphqlService,
    private router: Router,
    private adminService: AdminService,
    private dialog: MatDialog,
  ) { }

  flight$: Subscription
  cache: Flight[]
  flights: Flight[]
  displayed: Flight[]
  temp: Flight[]

  itemsPerPage: number
  pageIdx: number

  totalPage: number
  ngOnInit() {

    if(this.adminService.getAdmin() === false){
      this.router.navigate(['./admin/auth'])
    }

    this.pageIdx = 0
    this.itemsPerPage = 10
    
    this.flight$ = this.graphqlService.getAllFlights()
    .subscribe(async query=>{
      this.cache = query.data.allflights
      this.flights = query.data.allflights
      await this.sliceData()
    })

    setInterval(function(){
      
      this.flight$ = this.graphqlService.getAllFlights()
        .subscribe(async query=>{
          this.temp = query.data.allflights
        await this.compareData()
    })
    }.bind(this), 5000)
  }

  sliceData(){
    
    this.totalPage = Math.ceil(this.flights.length / this.itemsPerPage)
    this.displayed = []

    
    var temp = this.flights.slice(this.pageIdx*this.itemsPerPage, this.pageIdx * this.itemsPerPage + this.itemsPerPage)

    this.displayed.push(...temp)

  }

  paginate(dir: string){
    if(dir === "left" && this.pageIdx-1 >= 0){
      this.pageIdx--
      this.sliceData()
    }else if(dir === "right" && this.pageIdx+1 < this.totalPage){
      this.pageIdx++
      this.sliceData()
    }
  }

  compareData(){
    if(this.cache.length < this.temp.length){
      alert("New Flight Has been Posted!")
      this.cache = this.temp
      this.sliceData();
    }
  }

  addFlight(){
    this.router.navigate(['./flight-editor'])
  }
  
  deleteFlight(id: number){
    console.log(id)
    this.adminService.deletedIdx = id
    this.adminService.deletedType = "Flight"

    let ref = this.dialog.open(DeletePopupComponent,{
      height:"200px",
      width: "300px"
    })


    
  }

  updateFlight(id: number){
    this.router.navigate(['./flight-editor',id])
  }

}
