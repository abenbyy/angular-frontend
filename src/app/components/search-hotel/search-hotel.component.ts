import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel';
import { Subscription } from 'rxjs';
import { HotelFilter } from '../../models/hotelfilter';
import * as L from 'leaflet';
import { AttributeMarker } from '@angular/compiler/src/core';
//import icon from '../../../assets/icons/marker-icon.png';
//import iconShadow from '../../../assets/icons/marker-icon.png';

@Component({
  selector: 'app-search-hotel',
  templateUrl: './search-hotel.component.html',
  styleUrls: ['./search-hotel.component.scss']
})
export class SearchHotelComponent implements OnInit {

  constructor(
    private searchService : SearchService,
    private graphqlService: GraphqlService,
    private router : Router,
  ) { 

    this.checkBool = new Array(20).fill(false)

    this.filter = new HotelFilter()
    this.filter.stars = []
    this.oneStar = 0
    this.twoStar = 0
    this.threeStar= 0
    this.fourStar = 0
    this.fiveStar = 0
  }

  filter: HotelFilter
  hotels: Hotel[]
  hotel$: Subscription
  displayedHotel: Hotel[]
  selectedCity
  pageIdx: number
  checkBool: boolean[]
  isMap: boolean = true
  map

  
  ngOnInit() {
    this.isMap = false
    this.hotels = this.searchService.hotelResult
    this.selectedCity = this.searchService.selectedHotelCity
    // let DefaultIcon = L.icon({
    //   iconUrl: icon,
    //   shadowUrl: iconShadow,
    // });
  
    //L.Marker.prototype.options.icon = DefaultIcon;
    this.getStarPropertyCount()
    

    setInterval(function(){
      if(!this.map){
        this.map = L.map('leafletmap').setView([this.hotels[0].latitude, this.hotels[0].longitude], 14);
      alert(this.map)
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      }
      
    }.bind(this), 300)
    
    
      
    //   var marks
    //   this.hotels.forEach(function(val){
    //     var marker = L.marker([val.latitude, val.longitude]).addTo(map);
    //  //marker.addTo(map)
    //     marks.push(marker)
    //     //marker.bindPopup(val.name).openPopup();
    //   }.bind(this))

      //this.switchMap()
      
     
  }

  oneStar
  twoStar
  threeStar
  fourStar
  fiveStar
  getStarPropertyCount(){
    this.oneStar = 0
    this.twoStar = 0
    this.threeStar = 0
    this.fourStar = 0
    this.fiveStar = 0

    this.hotels.forEach(function(val){      
      if(val.star == 1) this.oneStar++
      else if (val.star == 2) this.twoStar++
      else if (val.star == 3) this.threeStar++
      else if (val.star == 4) this.fourStar++
      else if (val.star == 5) this.fiveStar++
    }.bind(this))

  }
  goToDetail(hotel:Hotel){
    this.searchService.selectedHotel = hotel
    this.router.navigate(["./detailpage"])
    
  }

  resetFilter(){
    this.filter.stars = []
    for(let i=0;i<20;i++){
      this.checkBool[i] = false
    }
    
    this.hotel$ = this.graphqlService.searchHotels(this.selectedCity)
    .subscribe(query =>{
      this.hotels = query.data.searchhotel
    })
    this.getStarPropertyCount()
  }
  filterStar(val:number):void{
    
    if(!this.filter.stars.find(el => el == val)){
      this.filter.stars.push(val)
    }
    else{
      const idx = this.filter.stars.findIndex(el => el == val) 
      this.filter.stars.splice(idx,1)
    }
    
    this.hotel$ = this.graphqlService.filterHotels(this.filter)
    .subscribe(async query=>{
      this.hotels = query.data.filterhotel
      await this.getStarPropertyCount()
    })
    
  }

  filterFacility(val:string):void{
    switch(val){
      case "ac":
        this.filter.facilities[0] = !this.filter.facilities[0]
        break
      case "parking":
        this.filter.facilities[1] = !this.filter.facilities[1]
        break
      case "receptionist":
        this.filter.facilities[2] = !this.filter.facilities[2]
        break 
      case "pool":
        this.filter.facilities[3] = !this.filter.facilities[3]
        break
      case "lift":
        this.filter.facilities[4] = !this.filter.facilities[4]
        break
      case "restaurant":
        this.filter.facilities[5] = !this.filter.facilities[5]
        break
      case "wifi":
        this.filter.facilities[6] = !this.filter.facilities[6]
        break
      case "spa":
        this.filter.facilities[7] = !this.filter.facilities[7]
        break
    }
  }

  formatLabel(value:number){
    return 'IDR '+value
  }

  switchMap(){
    this.isMap = !this.isMap
    
    
      
      
    //  for(let i = 0 ;i<this.hotels.length;i++){
    //   var marker = L.marker([this.hotels[i].latitude, this.hotels[i].longitude]).addTo(map);
    //   marker.bindPopup(this.hotels[i].name).openPopup();
    //  }
  }
}
