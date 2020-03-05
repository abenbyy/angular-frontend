import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GraphqlService } from 'src/app/services/graphql.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { query } from '@angular/animations';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private graphqlService: GraphqlService,
    private dialog: MatDialog,
  ) { }

  sub$: Subscription

  isLoading: boolean
  ngOnInit() {
    this.isLoading = false
  }

  no(){
    this.dialog.closeAll()
  }

  yes(){
    if(this.adminService.deletedType === "Blog"){
      this.deleteBlog()
    }
    else if(this.adminService.deletedType === "Hotel"){
      this.deleteHotel()
    }else if(this.adminService.deletedType === "Entertainment"){
      this.deleteEntertainment()
    }else if(this.adminService.deletedType === "Flight"){
    this.deleteFlight()
    }
    else if(this.adminService.deletedType === "Trip"){
      console.log("asd")
      this.deleteTrip()
      }

  }

  
  deleteBlog(){
    this.isLoading = true
    this.sub$ = this.graphqlService.deleteBlog(this.adminService.deletedIdx)
    .subscribe(async mutation=>{
      this.isLoading = false
      await this.dialog.closeAll()
    })
    
  }

  deleteHotel(){
    this.isLoading = true
    this.sub$ = this.graphqlService.deleteHotel(this.adminService.deletedIdx)
    .subscribe(async mutation=>{
      this.isLoading = false
      await this.dialog.closeAll()
    })
    
  }

  deleteEntertainment(){
    this.isLoading = true
    this.sub$ = this.graphqlService.deleteEntertainment(this.adminService.deletedIdx)
    .subscribe(async mutation=>{
      this.isLoading = false
      await this.dialog.closeAll()
    })
  }

  deleteFlight(){
    this.isLoading = true
    this.sub$ = this.graphqlService.deleteFlight(this.adminService.deletedIdx)
    .subscribe(async mutation=>{
      this.isLoading = false
      await this.dialog.closeAll()
    })
  }

  deleteTrip(){
    this.isLoading = true
    this.sub$ =  this.graphqlService.deleteTrip(this.adminService.deletedIdx)
    .subscribe(async mutation=>{
      this.isLoading = false
      await this.dialog.closeAll()
    })
  }

}
