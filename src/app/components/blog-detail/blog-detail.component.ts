import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Entertainment } from 'src/app/models/entertainment';
import { Blog } from 'src/app/models/blog';
import { Subscription } from 'rxjs';
import { GraphqlService } from 'src/app/services/graphql.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  selectedBlog: Blog

  blog$: Subscription
  popblog$: Subscription

  popularBlogs: Blog[]
  constructor(
    private searchService: SearchService,
    private graphqlService: GraphqlService,
    private route: Router,
    private actRoute: ActivatedRoute,
  ) { }


  ngOnInit() {

    let id = +this.actRoute.snapshot.paramMap.get('id')

    this.blog$ = this.graphqlService.getBlog(id)
    .subscribe(async query =>{
      this.selectedBlog = query.data.blog
    })

    this.popblog$ = this.graphqlService.getPopularBlogs()
    .subscribe(async query=>{
      this.popularBlogs = query.data.popularblogs
    })



  }

  share(arg: string){
    if(arg === "Facebook"){
      //href="https://www.facebook.com/sharer.php?u=https%3A%2F%2Fblog.tiket.com%2Ftempat-wisata-di-seoul-untuk-liburan-keluarga%2F"
      window.open("https://www.facebook.com/sharer.php?")
    }
    else if(arg === "Line"){
      //href="http://line.me/R/msg/text/?15+Pemandangan+Alam+Terindah+di+Indonesia+Ini+Bikin+Takjub+%7C+tiket.com%20https%3A%2F%2Fblog.tiket.com%2Fpemandangan-alam-terindah-di-indonesia%2F"
      window.open("http://line.me/R/msg/text/?"+document.URL)
    }
    else if(arg === "Whatsapp"){
      //href="https://api.whatsapp.com/send?text=15%20Pemandangan%20Alam%20Terindah%20di%20Indonesia%20Ini%20Bikin%20Takjub%20%7C%20tiket.com%20https%3A%2F%2Fblog.tiket.com%2Fpemandangan-alam-terindah-di-indonesia%2F"
      window.open( "https://api.whatsapp.com/send?text="+document.URL)
    }
  }

}
