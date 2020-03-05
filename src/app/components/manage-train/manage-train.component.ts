import { Component, OnInit } from '@angular/core';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Subscription } from 'rxjs';
import { Trip } from 'src/app/models/trip';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';

@Component({
  selector: 'app-manage-train',
  templateUrl: './manage-train.component.html',
  styleUrls: ['./manage-train.component.scss']
})
export class ManageTrainComponent implements OnInit {

  constructor(
    private graphqlService: GraphqlService,
    private router: Router,
    private adminService: AdminService,
    private dialog: MatDialog,
  ) { }

  trip$: Subscription
  cache: Trip[]
  trips:  Trip[]
  displayed: Trip[]
  temp: Trip[]

  itemsPerPage:number
  pageIdx:number
  totalPage:number


  ngOnInit() {

    if(this.adminService.getAdmin() === false){
      this.router.navigate(['./admin/auth'])
    }

    this.pageIdx = 0
    this.itemsPerPage = 10

    this.trip$ = this.graphqlService.getAllTrips()
    .subscribe(async query=>{
      this.cache = query.data.alltrips
      this.trips = query.data.alltrips
      await this.sliceData()
    })

    setInterval(function(){
      this.trip$ = this.graphqlService.getAllTrips()
      .subscribe(async query =>{
        this.temp = query.data.alltrips
      
        await this.compareData()
      })
    }.bind(this), 5000)    
  }

  sliceData(){
    
    this.totalPage = Math.ceil(this.trips.length / this.itemsPerPage)
    this.displayed = []

    
    var temp = this.trips.slice(this.pageIdx*this.itemsPerPage, this.pageIdx * this.itemsPerPage + this.itemsPerPage)

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
    console.log(this.cache.length+" "+this.temp.length)
    if(this.cache.length < this.temp.length){
      alert("New Train Trip Has been Posted!")
      this.cache = this.temp
      this.sliceData();
    }
  }

  addTrip(){
    this.router.navigate(['./train-editor'])
  }

  deleteTrip(id: number){
    
    this.adminService.deletedIdx = id
    this.adminService.deletedType = "Trip"

    let ref = this.dialog.open(DeletePopupComponent,{
      height:"200px",
      width: "300px"
    })


    
  }

  updateTrip(id: number){
    this.router.navigate(['./train-editor',id])
  }

}
