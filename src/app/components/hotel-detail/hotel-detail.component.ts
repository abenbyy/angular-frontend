import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Hotel } from 'src/app/models/hotel';
import * as L from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import { HotelImageSliderComponent } from '../hotel-image-slider/hotel-image-slider.component';
import { PageEvent } from '@angular/material/paginator';
import { HotelReview } from 'src/app/models/hotelreview';
import { HotelRoom } from 'src/app/models/hotelroom';
import { Subscription } from 'rxjs';
import { GraphqlService } from 'src/app/services/graphql.service';
import { ActivatedRoute } from '@angular/router';

//import icon from 'leaflet/dist/images/marker-icon.png';
//import iconShadow from 'leaflet/dist/images/marker-shadow.png';
//import icon from '../../../assets/icons/marker-icon.png';
//import iconShadow from '../../../assets/icons/marker-icon.png';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {

  constructor(
    private searchService: SearchService,
    private logDialog : MatDialog,
    private graphqlService: GraphqlService,
    private actRoute: ActivatedRoute,
  ) { 

   
  }
  
  //private mymap

    selectedCity
    
    currRevIdx
    revSize
    selectedHotel: Hotel
    displayedReviews : HotelReview[]

    displayedRooms : HotelRoom[]

  sliceReview(){
    
    this.displayedReviews = []
    this.displayedReviews = this.selectedHotel.reviews.slice(this.currRevIdx * this.revSize,this.currRevIdx * this.revSize+this.revSize)

    
  }

  paginateLeft(){
    this.currRevIdx--
    if(this.currRevIdx < 0){
      this.currRevIdx = 0
    }
    this.sliceReview()
  }

  paginateRight(){
    this.currRevIdx++
    if(this.currRevIdx*this.revSize >= this.selectedHotel.reviews.length){
      this.currRevIdx--
    }
    this.sliceReview()
  }

  filterRooms(freeBreakfast:boolean, free){

  }
  hotel$: Subscription
  
  ngOnInit() {
    var id = + this.actRoute.snapshot.paramMap.get('id')
    this.hotel$ = this.graphqlService.getHotel(id)
    .subscribe(async query =>{
      this.selectedHotel = query.data.hotel
      this.displayedRooms = query.data.hotel.rooms
      await this.sliceReview()
    })
    //this.selectedHotel = this.searchService.selectedHotel
    this.selectedCity = this.searchService.selectedHotelCity
    this.currRevIdx = 0
    this.revSize = 5
    this.sliceReview()

//    this.displayedRooms = this.selectedHotel.rooms

    // this.map = L.map('mapid', {
    //   center: [ this.selectedHotel.latitude, this.selectedHotel.longitude],
    //   zoom: this.selectedHotel.zoomlevel
    // });

    // const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // maxZoom: 19,
    // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // });

    // tiles.addTo(this.map);
    
    // let DefaultIcon = L.icon({
    //   iconUrl: icon,
    //   shadowUrl: iconShadow,
    // });
  
  //L.Marker.prototype.options.icon = DefaultIcon;
  
  var iconDefault = L.divIcon({
    className: 'custom-div-icon',
    html: "<img src='../../../assets/icons/marker-icon.png'></img>",
    iconSize: [100, 42],
    iconAnchor: [15, 42]
  })

    var map = L.map('mapid').setView([this.selectedHotel.latitude, this.selectedHotel.longitude], this.selectedHotel.zoomlevel);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    //L.marker([this.selectedHotel.latitude, this.selectedHotel.longitude]).addTo(this.map)
     var marker = L.marker([this.selectedHotel.latitude, this.selectedHotel.longitude],{icon: iconDefault}).addTo(map);
     //marker.addTo(map)
     marker.bindPopup(this.selectedHotel.name).openPopup();

  }


  shareLink(){
    var copyText = document.URL
    var el = document.createElement("textarea") 
    el.value = copyText
    alert(el.value)
    //el.style.display = "none"
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    //el.setAttribute('readonly','')    
  }

  showSlider(){
    this.logDialog.open(HotelImageSliderComponent,{
      width: "75vw",
      height:"80vh"
    })
  }

  shareFacebook(){
    window.open("https://www.facebook.com/sharer.php?")
  }

  shareMail(){
    location.href = "mailto:?subject=Check out this hotel&amp;body=links:"+document.URL
  }

}
