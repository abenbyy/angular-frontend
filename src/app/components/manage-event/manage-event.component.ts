import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Subscription } from 'rxjs';
import { Entertainment } from 'src/app/models/entertainment';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss']
})
export class ManageEventComponent implements OnInit {

  constructor(
    private router: Router,
    private adminService : AdminService,
    private graphqlService: GraphqlService,
    private dialog: MatDialog,
  ) { }

  ent$: Subscription
  cache: Entertainment[]
  ents : Entertainment[]
  displayed: Entertainment[]
  temp: Entertainment[]
  pageIdx: number
  itemsPerPage: number
  totalPage: number
  
  ngOnInit() {
    if(this.adminService.getAdmin() === false){
      this.router.navigate(['./admin/auth'])
    }
    this.pageIdx = 0
    this.itemsPerPage = 10

    this.ent$ = this.graphqlService.getAllEntertainment()
    .subscribe(async query=>{
      this.cache = query.data.allentertainments
      this.ents = query.data.allentertainments
      await this.sliceData()
    })
    
    setInterval(function(){
      
      this.ent$ = this.graphqlService.getAllEntertainment()
      .subscribe(async query =>{
        this.temp = query.data.allentertainments
        await this.compareData()
      }) 
    }.bind(this), 5000)

  }

  sliceData(){
    this.totalPage = Math.ceil(this.ents.length / this.itemsPerPage)
    this.displayed = []

    
    var temp = this.ents.slice(this.pageIdx*this.itemsPerPage, this.pageIdx * this.itemsPerPage + this.itemsPerPage)

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
      alert("New Post Has been Posted!")
      this.cache = this.temp
      this.sliceData();
    }
  }

  addEvent(){
    this.router.navigate(['./event-editor'])
  }
  
  updateEvent(id: number){
    this.router.navigate(['./event-editor',id])
  }
  deleteEvent(id: number){
    console.log(id)
    this.adminService.deletedIdx = id
    this.adminService.deletedType = "Entertainment"

    let ref = this.dialog.open(DeletePopupComponent,{
      height:"200px",
      width: "300px"
    })


    
  }


}
