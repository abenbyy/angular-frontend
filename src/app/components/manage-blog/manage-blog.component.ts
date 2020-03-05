import { Component, OnInit } from '@angular/core';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Subscription } from 'rxjs';
import { Blog } from 'src/app/models/blog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';

@Component({
  selector: 'app-manage-blog',
  templateUrl: './manage-blog.component.html',
  styleUrls: ['./manage-blog.component.scss']
})
export class ManageBlogComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private graphqlService: GraphqlService,
    private router: Router,
    private dialog: MatDialog,
    private ref: MatDialogRef<DeletePopupComponent>,
  ) { }

  blog$: Subscription
  cache: Blog[]
  blogs: Blog[]
  displayed: Blog[]
  temp: Blog[]

  itemsPerPage: number
  pageIdx: number

  totalPage: number
  


  ngOnInit() {
    if(this.adminService.getAdmin() === false){
      this.router.navigate(['./admin/auth'])
    }

    this.pageIdx = 0
    this.itemsPerPage = 10
    
    this.blog$ = this.graphqlService.getAllBlogs()
    .subscribe(async query=>{
      this.cache = query.data.allblogs
      this.blogs = query.data.allblogs
      await this.sliceData()
    })

    setInterval(function(){
      
      this.blog$ = this.graphqlService.getAllBlogs()
      .subscribe(async query =>{
        this.temp = query.data.allblogs
        await this.compareData()
      }) 
    }.bind(this), 5000)

    

    


  }


  sliceData(){
    this.totalPage = Math.ceil(this.blogs.length / this.itemsPerPage)
    this.displayed = []

    
    var temp = this.blogs.slice(this.pageIdx*this.itemsPerPage, this.pageIdx * this.itemsPerPage + this.itemsPerPage)

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

  addBlog(){
    this.router.navigate(['./blog-editor'])
  }
  
  deleteBlog(id: number){
    this.adminService.deletedIdx = id
    this.adminService.deletedType = "Blog"

    let ref = this.dialog.open(DeletePopupComponent,{
      height:"200px",
      width: "300px"
    })


    
  }

  updateBlog(id: number){
    this.router.navigate(['./blog-editor',id])
  }



}
