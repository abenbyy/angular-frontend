import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Hotel } from 'src/app/models/hotel';
import * as L from 'leaflet';
//import icon from 'leaflet/dist/images/marker-icon.png';
//import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import icon from '../../../assets/icons/marker-icon.png';
import iconShadow from '../../../assets/icons/marker-icon.png';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {

  constructor(
    private searchService: SearchService,
  ) { }
  
  //private mymap




  selectedHotel: Hotel
  ngOnInit() {
    this.selectedHotel = this.searchService.selectedHotel
    
    // this.map = L.map('mapid', {
    //   center: [ this.selectedHotel.latitude, this.selectedHotel.longitude],
    //   zoom: this.selectedHotel.zoomlevel
    // });

    // const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // maxZoom: 19,
    // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // });

    // tiles.addTo(this.map);
    console.log(this.selectedHotel.latitude)
    console.log(this.selectedHotel.longitude)
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
    });
  
  L.Marker.prototype.options.icon = DefaultIcon;
    var map = L.map('mapid').setView([this.selectedHotel.latitude, this.selectedHotel.longitude], this.selectedHotel.zoomlevel);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    //L.marker([this.selectedHotel.latitude, this.selectedHotel.longitude]).addTo(this.map)
     var marker = L.marker([this.selectedHotel.latitude, this.selectedHotel.longitude]).addTo(map);
     //marker.addTo(map)
     marker.bindPopup(this.selectedHotel.name).openPopup();

  }

}
