import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Blog } from 'src/app/models/blog';
import { GraphqlService } from 'src/app/services/graphql.service';
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blog$: Subscription
  blogs: Blog[]
  temp: Blog[]
  constructor(
    private graphqlService: GraphqlService,
    private searchService: SearchService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.blog$ = this.graphqlService.getAllBlogs()
    .subscribe(query =>{
      this.blogs = query.data.allblogs
    })

    setInterval(function(){
      
      this.blog$ = this.graphqlService.getAllBlogs()
      .subscribe(async query =>{
        this.temp = query.data.allblogs
        await this.compareData()
      }) 
    }.bind(this), 5000)
  }

  compareData(){
    if(this.blogs.length < this.temp.length){
      alert("New Post Has been Posted!")
      this.blogs = this.temp
    }
  }

  goToDetail(val: Blog){
    this.searchService.selectedBlog = val
    this.router.navigate(['./blogs',val.id])
  }

}
