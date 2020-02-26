import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Router } from '@angular/router';
import { Entertainment } from 'src/app/models/entertainment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-entertainment',
  templateUrl: './search-entertainment.component.html',
  styleUrls: ['./search-entertainment.component.scss']
})
export class SearchEntertainmentComponent implements OnInit {

  selectedType: string
  ent$: Subscription
  entertainments: Entertainment[]
  displayedEnts: Entertainment[]
  scrollIdx:number
  checkBool: boolean[]
  
  constructor(
    private searchService: SearchService,
    private graphqlService: GraphqlService,
    private router: Router
  ) { 
    this.checkBool = new Array(20).fill(false)
  }

  ngOnInit() {
    this.scrollIdx = 0    

    this.selectedType = this.searchService.selectedType
    this.entertainments = []
    this.displayedEnts = []

    this.ent$ = this.graphqlService.searchEntertainments(this.selectedType)
    .subscribe(async query =>{
      this.entertainments = query.data.searchentertainment
      await this.sliceData()
    })

    
    document.onscroll = function(){
      if(window.scrollY + window.innerHeight >= document.body.scrollHeight){
        this.scrollIdx++
        this.sliceData()
        
      }
    }.bind(this)

  }

  sliceData(){
    var temp = []

    temp = this.entertainments.slice(this.scrollIdx*5,this.scrollIdx*5+5)
    console.log(temp)
    this.displayedEnts.push(...temp)
    
  }

  goToDetail(val: Entertainment){
    this.searchService.selectedEnt = val
    this.router.navigate(['./entertainmentdetail'])
  }

  formatLabel(val){
    return "IDR "+ val
  }

  resetFilter(){
    for(let i=0;i<this.checkBool.length;i++){
      this.checkBool[i] = false
    }
    
  }
}
