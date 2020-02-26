import { Component, OnInit } from '@angular/core';
import { Entertainment } from 'src/app/models/entertainment';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entertainments',
  templateUrl: './entertainments.component.html',
  styleUrls: ['./entertainments.component.scss']
})
export class EntertainmentsComponent implements OnInit {

  bestEntertainments: Entertainment[]
  displayedBests: Entertainment[]
  trendingActivities: Entertainment[]
  trendingAttractions: Entertainment[]
  trendingEvents: Entertainment[]

  best$: Subscription
  activitie$: Subscription
  attraction$: Subscription
  event$: Subscription

  slides: any
  firstIdx: any
  secondIdx: any
  thirdIdx: any

  selectedType

  constructor(
    private searchService: SearchService,
    private graphqlService: GraphqlService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.selectedType = ""

    this.firstIdx = 0
    this.secondIdx = 1
    this.thirdIdx = 2

    this.best$ = this.graphqlService.getBestEntertainment()
    .subscribe(async query=>{
      this.bestEntertainments = query.data.bestentertainment
      await this.loadBest()
    })

    this.activitie$ = this.graphqlService.getTrendingEntertainment("Activity")
    .subscribe(async query=>{
      this.trendingActivities = query.data.trendingentertainment
    })

    this.attraction$ = this.graphqlService.getTrendingEntertainment("Attraction")
    .subscribe(async query=>{
      this.trendingAttractions = query.data.trendingentertainment
    })

    this.event$ = this.graphqlService.getTrendingEntertainment("Event")
    .subscribe(async query=>{
      this.trendingEvents = query.data.trendingentertainment
    })

  
    // window.onload = function(){
    //   var temp = document.querySelectorAll(".slides")
    //   console.log(temp)
    //   this.slides = []

    //   for(let i = 0 ; i < temp.length ; i++){
    //       this.slides.push(temp[i] as HTMLElement)
    //       this.slides[i].style.display = "none"
    //   }

      
    // }.bind(this)
    



  }

  loadBest(){
    this.displayedBests = []
    
    this.displayedBests.push(this.bestEntertainments[0])
    this.displayedBests.push(this.bestEntertainments[1])
    this.displayedBests.push(this.bestEntertainments[2])
  }

  slideRight(){
    
    this.firstIdx++
    if(this.firstIdx > this.bestEntertainments.length-1) this.firstIdx = 0
    this.secondIdx++
    if(this.secondIdx > this.bestEntertainments.length-1) this.secondIdx = 0
    this.thirdIdx++
    if(this.thirdIdx > this.bestEntertainments.length-1) this.thirdIdx = 0

    console.log("1: "+ this.firstIdx)
    console.log("2: "+ this.secondIdx)
    console.log("3: "+ this.thirdIdx)
    this.displayedBests[0] = this.bestEntertainments[this.firstIdx]
    this.displayedBests[1] = this.bestEntertainments[this.secondIdx]
    this.displayedBests[2] = this.bestEntertainments[this.thirdIdx]
    
  }

  slideLeft(){
    
    this.firstIdx--
    if(this.firstIdx < 0) this.firstIdx = this.bestEntertainments.length-1
    this.secondIdx--
    if(this.secondIdx < 0) this.secondIdx = this.bestEntertainments.length-1
    this.thirdIdx--
    if(this.thirdIdx < 0) this.thirdIdx = this.bestEntertainments.length-1

    console.log("1: "+ this.firstIdx)
    console.log("2: "+ this.secondIdx)
    console.log("3: "+ this.thirdIdx)

    this.displayedBests[0] = this.bestEntertainments[this.firstIdx]
    this.displayedBests[1] = this.bestEntertainments[this.secondIdx]
    this.displayedBests[2] = this.bestEntertainments[this.thirdIdx]
    
  }

  goToEntertainmentDetail(val: Entertainment){
    this.searchService.selectedEnt = val
    this.router.navigate(['./entertainmentdetail'])
  }

  searchEnt(){
    this.searchService.selectedType = this.selectedType
    this.router.navigate(['./searchentertainment'])
  }
  
}
