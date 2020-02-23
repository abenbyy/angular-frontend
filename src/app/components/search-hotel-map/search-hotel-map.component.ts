import { Component, OnInit } from '@angular/core';
import L from 'leaflet';
import { Hotel } from 'src/app/models/hotel';
import { SearchService } from 'src/app/services/search.service';
import { GraphqlService } from 'src/app/services/graphql.service';
import { Router } from '@angular/router';
import { HotelFacility } from 'src/app/models/hotelfacility';


@Component({
  selector: 'app-search-hotel-map',
  templateUrl: './search-hotel-map.component.html',
  styleUrls: ['./search-hotel-map.component.scss']
})
export class SearchHotelMapComponent implements OnInit {

  constructor(
    private searchService: SearchService,
    private graphqlService: GraphqlService,
    private router : Router,
  ) { }

  icons: any[]
  map: any
  hotels: Hotel[]
  displayedHotels: Hotel[]
  markers: any[]
  selectedName
  selectedPrice
  selectedFacilities

  checkBool: boolean[]
  currIdx
  featGroup: any
  ngOnInit() {
    this.checkBool = new Array(20).fill(false)
    this.currIdx = 0
    this.selectedFacilities = new HotelFacility()
    this.icons = []
    this.markers = []
    this.hotels = this.searchService.hotelResult
    this.displayedHotels = this.hotels
    this.map = L.map('leafletmap').setView([this.hotels[0].latitude, this.hotels[0].longitude], 14);
      
      
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.featGroup = L.featureGroup().addTo(this.map).on("click",this.markerOnClick)
    this.showMarkers()

  }


  showMarkers(){
    this.markers = []
    this.icons = []
    for(let i =0;i<this.displayedHotels.length;i++){
        this.icons.push(L.divIcon({
          className: 'custom-div-icon',
          html: "<div style='background-color:white;text-align:center;padding:10px;border-radius:5px;' class='marker'>IDR"+this.displayedHotels[i].rooms[0].price+"</div>",
          iconSize: [100, 42],
          iconAnchor: [15, 42]
        }))

        this.markers.push(L.marker([this.displayedHotels[i].latitude, this.displayedHotels[i].longitude],{icon:this.icons[i]}).addTo(this.featGroup).addTo(this.map))
        this.markers[i].name = this.displayedHotels[i].name
        this.markers[i].idx = i
        this.markers[i].address = this.displayedHotels[i].address
        this.markers[i].facilities = this.displayedHotels[i].facilities[0]
        this.markers[i].price = this.displayedHotels[i].rooms[0].price
       //marker.addTo(map)
        this.markers[i].bindPopup(this.displayedHotels[i].name).openPopup();
        

        
      
    }
  }

  switchMap(){
    this.searchService.hotelResult = this.hotels
    this.router.navigate(["./searchhotel"])
  }
  goToDetail(){
    this.searchService.selectedHotel = this.hotels[this.currIdx]
    this.router.navigate(["./detailpage"])
  }
  markerOnClick(event){

    this.currIdx = event.layer.idx
    this.selectedName = event.layer.name    
    var name = document.getElementById("hotel-name")
    name.innerText = this.selectedName

    var address = document.getElementById("hotel-address")
    address.innerText = event.layer.address

    this.selectedFacilities = event.layer.facilities

    console.log(this.selectedFacilities.ac)

    var ac = document.getElementById("hotel-ac")
    if(this.selectedFacilities.ac){
      ac.innerText = "ac_unit"
    }else{
      ac.innerText = ""
    }

    var park = document.getElementById("hotel-park")
    if(this.selectedFacilities.parking){
      park.innerText = "local_parking"
    }else{
      park.innerText = ""
    }

    var rec = document.getElementById("hotel-rec")
    if(this.selectedFacilities.receptionist){
      rec.innerText = "face"
    }else{
      rec.innerText = ""
    }

    var pool = document.getElementById("hotel-pool")
    if(this.selectedFacilities.pool){
      pool.innerText = "pool"
    }else{
      pool.innerText = ""
    }

    var lift = document.getElementById("hotel-lift")
    if(this.selectedFacilities.lift){
      lift.innerText = "nfc"
    }else{
      lift.innerText = ""
    }

    var res = document.getElementById("hotel-rest")
    if(this.selectedFacilities.restaurant){
      res.innerText = "restaurant"
    }else{
      res.innerText = ""
    }

    var wifi = document.getElementById("hotel-wifi")
    if(this.selectedFacilities.wifi){
      wifi.innerText = "wifi"
    }else{
      wifi.innerText = ""
    }

    var spa = document.getElementById("hotel-spa")
    if(this.selectedFacilities.spa){
      spa.innerText = "spa"
    }else{
      spa.innerText = ""
    }
  }

  


}
