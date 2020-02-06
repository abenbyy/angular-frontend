import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel';
import { Subscription } from 'rxjs';
import * as L from 'leaflet';
import icon from '../../../assets/icons/marker-icon.png';
import iconShadow from '../../../assets/icons/marker-icon.png';

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
  }

  hotels: Hotel[]
  hotel$: Subscription
  displayedHotel: Hotel[]
  selectedCity
  pageIdx: number
  checkBool: boolean[]
  isMap: boolean

  map

  ngOnInit() {
    this.isMap = false
    this.hotels = this.searchService.hotelResult
    this.selectedCity = this.searchService.selectedHotelCity
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
    });
  
    L.Marker.prototype.options.icon = DefaultIcon;
    var map = L.map('mapid').setView([this.hotels[0].latitude, this.hotels[0].longitude], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    
     for(let i = 0 ;i<this.hotels.length;i++){
      var marker = L.marker([this.hotels[i].latitude, this.hotels[i].longitude]).addTo(map);
      marker.bindPopup(this.hotels[i].name).openPopup();
     }
  }

  
  goToDetail(hotel:Hotel){
    this.searchService.selectedHotel = hotel
    this.router.navigate(["./detailpage"])
    
  }


  switchMap(){
    this.isMap = !this.isMap
  }
}
