import { Component, OnInit } from '@angular/core';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Subscription } from 'rxjs';
import { Blog } from 'src/app/models/blog';

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
  ) { }

  blog$: Subscription
  cache: Blog[]
  blogs: Blog[]
  displayed: Blog[]

  itemsPerPage: number
  pageIdx: number


  ngOnInit() {
    // if(this.adminService.isLoggedIn === false){
    //   this.router.navigate(['./admin/auth'])
    // }

    this.pageIdx = 0
    this.itemsPerPage = 10
    
    this.blog$ = this.graphqlService.getAllBlogs()
    .subscribe(async query=>{
      this.cache = query.data.allblogs
      this.blogs = query.data.allblogs
      await this.sliceData()
    })

    


  }


  sliceData(){
    this.displayed = []

    
    var temp = this.blogs.slice(this.pageIdx*this.itemsPerPage, this.pageIdx * this.itemsPerPage + this.itemsPerPage)

    this.displayed.push(...temp)

  }



}
