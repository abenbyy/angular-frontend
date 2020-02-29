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
  cache: Blog[]
  blogs: Blog[]
  temp: Blog[]

  scrollIdx: number
  constructor(
    private graphqlService: GraphqlService,
    private searchService: SearchService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.scrollIdx = 0
    this.blogs = []
    this.blog$ = this.graphqlService.getAllBlogs()
    .subscribe(async query =>{
      this.cache = query.data.allblogs
      await this.sliceData();
    })

    document.onscroll = function(){
      if(window.scrollY + window.innerHeight >= document.body.scrollHeight){
        this.scrollIdx++
        this.sliceData()
      }
    }.bind(this)

    setInterval(function(){
      
      this.blog$ = this.graphqlService.getAllBlogs()
      .subscribe(async query =>{
        this.temp = query.data.allblogs
        await this.compareData()
      }) 
    }.bind(this), 5000)
  }

  compareData(){
    if(this.cache.length < this.temp.length){
      alert("New Post Has been Posted!")
      this.cache = this.temp
      this.sliceData();
    }
  }

  goToDetail(val: Blog){
    //this.searchService.selectedBlog = val
    this.router.navigate(['./blogs',val.id])
  }

  sliceData(){
    let t = this.cache.slice(this.scrollIdx *5 , this.scrollIdx * 5+5)

    this.blogs.push(...t)
  }

  goToEditor(){
    this.router.navigate(['./blog-editor'])
  }
  

}
