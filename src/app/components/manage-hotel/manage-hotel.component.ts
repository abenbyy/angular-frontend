import { Component, OnInit } from '@angular/core';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Subscription } from 'rxjs';
import { Hotel } from 'src/app/models/hotel';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-hotel',
  templateUrl: './manage-hotel.component.html',
  styleUrls: ['./manage-hotel.component.scss']
})
export class ManageHotelComponent implements OnInit {

  constructor(
    private grapqhlService: GraphqlService,
    private router: Router,
    private adminService: AdminService,
    private dialog: MatDialog,
  ) { }

  hotel$ : Subscription
  cache: Hotel[]
  hotels: Hotel[]
  displayed : Hotel[]
  temp: Hotel[]
  pageIdx: number
  itemsPerPage: number
  totalPage: number

  ngOnInit() {
    if(this.adminService.getAdmin() === false){
      this.router.navigate(['./admin/auth'])
    }

    this.pageIdx = 0
    this.itemsPerPage = 2

    this.hotel$ = this.grapqhlService.getAllHotels()
    .subscribe(async query =>{
      this.cache = query.data.allhotels
      this.hotels = query.data.allhotels
      await this.sliceData()
    })

    setInterval(function(){
      this.hotel$ = this.grapqhlService.getAllHotels()
      .subscribe(async query =>{
      this.temp = query.data.allhotels
      
      await this.compareData()
    })
    
    }.bind(this), 5000)

  }

  sliceData(){
    this.totalPage = Math.ceil(this.hotels.length / this.itemsPerPage)
    this.displayed = []

    
    var temp = this.hotels.slice(this.pageIdx*this.itemsPerPage, this.pageIdx * this.itemsPerPage + this.itemsPerPage)

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
      alert("New Hotel Has been Posted!")
      this.cache = this.temp
      this.sliceData();
    }
  }

  addHotel(){
    this.router.navigate(['./hotel-editor'])
  }
  updateHotel(id: number){
    this.router.navigate(['./hotel-editor',id])
  }
  deleteHotel(id: number){
    
    this.adminService.deletedIdx = id
    this.adminService.deletedType = "Hotel"

    let ref = this.dialog.open(DeletePopupComponent,{
      height:"200px",
      width: "300px"
    })


    
  }


}
